import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';

@Injectable()
export class PaymentsService {
  private razorpay: Razorpay | null = null;
  private readonly webhookSecret: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {
    const keyId = this.config.get<string>('RAZORPAY_KEY_ID');
    const keySecret = this.config.get<string>('RAZORPAY_KEY_SECRET');
    this.webhookSecret = this.config.get<string>('RAZORPAY_WEBHOOK_SECRET', 'your-webhook-secret');

    if (keyId && keySecret) {
      this.razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
    }
  }

  /**
   * Retrieve all payment transactions (Admin)
   */
  async findAll() {
    return this.prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Create Razorpay Order
   * @param amount Amount in Rupees (will be converted to paise internally)
   * @param customerInfo Name, email, phone details
   */
  async createOrder(amount: number, customerInfo: { email: string; name: string; phone?: string; description?: string }) {
    // Razorpay amounts are in paise (e.g. 100 paise = 1 Rupee)
    const amountInPaise = Math.round(amount * 100);
    const currency = 'INR';

    let razorpayOrderId = `order_mock_${crypto.randomBytes(6).toString('hex')}`;

    if (this.razorpay) {
      try {
        const order = await this.razorpay.orders.create({
          amount: amountInPaise,
          currency,
          receipt: `receipt_${Date.now()}`,
        });
        razorpayOrderId = order.id;
      } catch (error: any) {
        console.error('Razorpay order creation failed:', error);
        throw new InternalServerErrorException(`Razorpay order failed: ${error.message}`);
      }
    }

    // Save initial transaction in DB
    return this.prisma.payment.create({
      data: {
        razorpayOrderId,
        amount: amountInPaise,
        currency,
        status: 'CREATED',
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        description: customerInfo.description,
      },
    });
  }

  /**
   * Verify Payment Signature
   */
  async verifyPayment(data: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) {
    const keySecret = this.config.get<string>('RAZORPAY_KEY_SECRET', 'your-razorpay-secret');
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
      .digest('hex');

    const isValid = generatedSignature === data.razorpaySignature;

    if (!isValid) {
      // Log failed payment attempt
      await this.prisma.payment.update({
        where: { razorpayOrderId: data.razorpayOrderId },
        data: { status: 'FAILED' },
      });
      throw new BadRequestException('Invalid signature verification failed');
    }

    // Update payment record
    const payment = await this.prisma.payment.update({
      where: { razorpayOrderId: data.razorpayOrderId },
      data: {
        razorpayPaymentId: data.razorpayPaymentId,
        razorpaySignature: data.razorpaySignature,
        status: 'CAPTURED',
      },
    });

    // Create Invoice for the successful payment
    const invoiceNumber = `INV-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    await this.prisma.invoice.create({
      data: {
        invoiceNumber,
        amount: payment.amount,
        currency: payment.currency,
        status: 'PAID',
        customerEmail: payment.customerEmail,
        customerName: payment.customerName,
        lineItems: [
          {
            description: payment.description || 'Enterprise System Service Billing',
            quantity: 1,
            unitAmount: payment.amount,
            amount: payment.amount,
          },
        ],
        paidAt: new Date(),
        payments: {
          connect: { id: payment.id },
        },
      },
    });

    return { success: true, payment };
  }

  /**
   * Handle Razorpay Webhook Event
   */
  async handleWebhook(rawBody: string, signature: string) {
    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new BadRequestException('Invalid webhook signature');
    }

    const event = JSON.parse(rawBody);

    // Save webhook log entry
    await this.prisma.razorpayWebhook.create({
      data: {
        eventType: event.event,
        payload: event,
        processed: true,
      },
    });

    // Process asynchronous payment events
    const paymentEntity = event.payload?.payment?.entity;
    if (paymentEntity) {
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;

      if (event.event === 'payment.captured') {
        await this.prisma.payment.updateMany({
          where: { razorpayOrderId: orderId },
          data: {
            razorpayPaymentId: paymentId,
            status: 'CAPTURED',
          },
        });
      } else if (event.event === 'payment.failed') {
        await this.prisma.payment.updateMany({
          where: { razorpayOrderId: orderId },
          data: {
            razorpayPaymentId: paymentId,
            status: 'FAILED',
          },
        });
      }
    }

    return { received: true };
  }
}
