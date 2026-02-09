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
  // Use CDN for Swagger UI assets instead of local files
  // In serverless environments (Vercel), static files from node_modules aren't available,
  // so we load CSS/JS from CDN to ensure the docs UI renders correctly in production
  SwaggerModule.setup('api/docs', app, document, {
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.31.0/swagger-ui.min.css',
    ],
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.31.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.31.0/swagger-ui-standalone-preset.js',
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT ?? 4005);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } else {
    await app.init();
  }

  return app.getHttpAdapter().getInstance();
}

let cachedApp: any;

async function getApp() {
  if (!cachedApp) {
    console.log('Available Env Vars:', Object.keys(process.env));
    console.log('Initializing NestJS application...');
    try {
      cachedApp = await bootstrap();
      console.log('NestJS application initialized successfully.');
    } catch (err) {
      console.error('Failed to initialize NestJS application:', err);
      throw err;
    }
  }
  return cachedApp;
}

export default async (req: unknown, res: unknown) => {
  try {
    const app = await getApp();
    (app as any)(req, res);
  } catch (err) {
    console.error('Handler error:', err);
    if (res && (res as any).status) {
      (res as any).status(500).json({
        message: 'Internal Server Error',
        error: (err as Error).message,
      });
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  getApp().catch((err) => console.error('Failed to start local server:', err));
}
