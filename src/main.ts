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
    await app.listen(process.env.PORT ?? 4005);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } else {
    await app.init();
  }

  return app.getHttpAdapter().getInstance();
}

const expressAppPromise = bootstrap();

export default async (req: unknown, res: unknown) => {
  const app = await expressAppPromise;
  (app as any)(req, res);
};
