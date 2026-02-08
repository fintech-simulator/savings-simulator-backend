import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Digital Savings Simulator API')
    .setDescription('The Digital Savings Simulator API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } else {
    await app.init();
  }

  return app.getHttpAdapter().getInstance();
}

const expressApp = bootstrap();

export default async (req: unknown, res: unknown) => {
  const app = await expressApp;
  (app as any)(req, res);
};

if (process.env.NODE_ENV !== 'production') {
  bootstrap().catch((err: Error) => console.error(err));
}
