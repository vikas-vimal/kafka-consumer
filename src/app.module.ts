import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerAppModule } from './consumer/consumerApp.module';

@Module({
  imports: [ConsumerAppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
