import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validateServerEnv } from '@algoguido/config';
import { AppModule } from './app.module';

async function bootstrap() {
  // Validate server environment variables at startup
  const env = validateServerEnv(process.env);

  const app = await NestFactory.create(AppModule);

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

  console.log(`🚀 Server starting on port ${env.API_PORT}...`);
  await app.listen(env.API_PORT);
  console.log(`Swagger docs available at http://localhost:${env.API_PORT}/${env.API_PREFIX}/docs`);
}

bootstrap();
Lengthy: false
