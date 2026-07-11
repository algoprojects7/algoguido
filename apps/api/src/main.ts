import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validateServerEnv } from '@algoguido/config';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let cachedServer: any;

async function bootstrapServer(): Promise<any> {
  if (!cachedServer) {
    try {
      const expressApp = express();

      // Map Vercel-injected Prisma Postgres variables if DATABASE_URL is not set
      if (!process.env.DATABASE_URL) {
        process.env.DATABASE_URL = process.env.PRISMA_DATABASE_URL || process.env.POSTGRES_URL;
      }

      const env = validateServerEnv(process.env);
      const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

      // Set API prefix
      app.setGlobalPrefix(env.API_PREFIX);

      // Enable CORS
      const corsOrigins = env.CORS_ORIGINS.split(',');
      app.enableCors({
        origin: corsOrigins,
        credentials: true,
      });

      // Enable global validation pipe
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: true,
        })
      );

      // Setup Swagger/OpenAPI documentation
      const config = new DocumentBuilder()
        .setTitle('Algoguido Technologies API')
        .setDescription('Enterprise System Core API for Algoguido Technologies')
        .setVersion('2.1')
        .addBearerAuth()
        .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup(`${env.API_PREFIX}/docs`, app, document);

      await app.init();
      cachedServer = expressApp;
    } catch (error) {
      console.error('❌ CRITICAL: NestJS Bootstrap Server Failed:', error);
      throw error;
    }
  }
  return cachedServer;
}

// Default export handler for Vercel Serverless Functions
export default async (req: any, res: any) => {
  const server = await bootstrapServer();
  return server(req, res);
};

// Standalone setup for local development
if (require.main === module || process.env.NODE_ENV === 'development') {
  const env = validateServerEnv(process.env);
  bootstrapServer().then((server) => {
    server.listen(env.API_PORT, () => {
      console.log(`🚀 Standalone local server starting on port ${env.API_PORT}...`);
      console.log(`Swagger docs available at http://localhost:${env.API_PORT}/${env.API_PREFIX}/docs`);
    });
  });
}
