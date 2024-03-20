import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Articles api')
  .setDescription('API')
  .setVersion('1.0')
  .addTag('articles')
  .build();
