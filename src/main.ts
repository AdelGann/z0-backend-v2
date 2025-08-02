import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Z0 - Api docs')
    .setDescription('Documentación de la API del sistema contable')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingrese su token JWT',
      },
      'bearer', // nombre del esquema o id que usarás para referenciarlo
    )
    .addTag('users', 'Endpoints relacionados con usuarios')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      // Esto asegura que Swagger "use" el esquema para todas las operaciones por defecto
      security: [{ bearer: [] }],
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
