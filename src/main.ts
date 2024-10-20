import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Permitir solo este origen
    credentials: true, // Habilitar envío de credenciales como cookies o cabeceras autorizadas
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
