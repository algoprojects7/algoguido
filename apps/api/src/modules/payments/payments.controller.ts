import { Controller, Get, Post, Body, Req, Headers, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import * as express from 'express';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('payments:read')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all payment transactions (Admin)' })
  async findAll() {
    return this.paymentsService.findAll();
  }

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
