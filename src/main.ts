import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aktifkan middleware CORS
  app.use(cors({ origin: 'http://localhost:3001' }));

  await app.listen(3000);
}
bootstrap();
