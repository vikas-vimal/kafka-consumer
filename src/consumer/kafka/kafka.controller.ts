import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { TestTopicHandlerService } from '../handler/test.topic.handler';
interface IncomingMessage {
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: any;
  value: any;
  headers: Record<string, any>;
}

@Controller()
export class KafkaController {
  constructor(
    @Inject('KAFKA_CONSUMER')
    private readonly kafkaClient: ClientKafka,
    private testTopicHandler: TestTopicHandlerService,
  ) {}

  async onModuleInit() {
    console.log('--- preparing kafka connection ---');
    this.kafkaClient.subscribeToResponseOf(process.env.KAFKA_TEST_TOPIC);
    console.log('--- connecting kafka ---');
    await this.kafkaClient.connect();
    console.log('--- connected kafka ---');
  }

  @MessagePattern(process.env.KAFKA_TEST_TOPIC)
  async handleMessage(@Payload() message: any) {
    console.log('Received message:', typeof message, ' :: ', message);
    try {
      this.testTopicHandler.caseHandler(message);
      //   console.log({ messageObj });
    } catch (error) {
      console.log(
        '----- Invalid message obj :: Not a JSON Object -----',
        message,
      );
    }
  }

  async onModuleDestroy() {
    console.log('--- closing kafka connection ---');
    await this.kafkaClient.close();
    console.log('--- closed kafka connection ---');
  }
}
