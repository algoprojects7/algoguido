import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { LeadsModule } from './modules/leads/leads.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { SeedModule } from './modules/seed/seed.module';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    DbModule,
    AuthModule,
    ProductsModule,
    LeadsModule,
    PaymentsModule,
    CertificatesModule,
    UploadsModule,
    SeedModule,
    EnterpriseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
