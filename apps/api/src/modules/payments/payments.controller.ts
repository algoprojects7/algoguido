import { Controller, Post, Body, Req, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import * as express from 'express';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('order')
  @ApiOperation({ summary: 'Create a new Razorpay order' })
  async createOrder(
    @Body('amount') amount: number,
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('phone') phone?: string,
    @Body('description') description?: string
  ) {
    return this.paymentsService.createOrder(amount, { email, name, phone, description });
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify Razorpay payment signature' })
  async verifyPayment(
    @Body('razorpayOrderId') razorpayOrderId: string,
    @Body('razorpayPaymentId') razorpayPaymentId: string,
    @Body('razorpaySignature') razorpaySignature: string
  ) {
    return this.paymentsService.verifyPayment({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Razorpay webhook receiver' })
  async handleWebhook(
    @Req() req: express.Request,
    @Headers('x-razorpay-signature') signature: string
  ) {
    // In express, raw body might be on req.body if not parsed, or parsed as object.
    // Let's stringify the body object if parsed, to validate signature correctly.
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    return this.paymentsService.handleWebhook(rawBody, signature);
  }
}
