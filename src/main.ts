import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("BlockAids API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true}));

  app.enableCors({
    origin: true,
    allowedHeaders:
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, Access-Control-Allow-Origin",
    methods: "GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();