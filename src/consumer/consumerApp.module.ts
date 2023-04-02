import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestTopicHandlerService } from './handler/test.topic.handler';
import { KafkaController } from './kafka/kafka.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'KAFKA_CONSUMER',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER],
          },
          consumer: {
            groupId: 'kafka-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [KafkaController],
  providers: [ClientKafka, TestTopicHandlerService, UserService, PrismaService],
})
export class ConsumerAppModule {}
