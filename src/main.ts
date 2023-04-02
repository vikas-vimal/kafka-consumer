import './env';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
// const PORT = Number(process.env.APP_PORT);
// console.log({ PORT });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'kafka-consumer',
        },
      },
    },
  );
  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);
  await app.listen();
}
bootstrap();
