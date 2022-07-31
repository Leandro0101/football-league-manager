import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SendEmailConfirmationConsumerService,
  SendEmailConfirmationProducerService,
} from './services/jobs';

const DB_USER = process.env.MONGO_USER;
const DB_PASS = process.env.MONGO_PASS;
const DB_HOST = process.env.MONGO_HOST;
const DB_PORT = process.env.MONGO_PORT;
const DB_NAME = process.env.MONGO_DB;
const DB_URL = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'send-email-confirmation',
    }),
    MongooseModule.forRoot(DB_URL, { authSource: 'admin' }),
    BullModule.forRoot({
      redis: {
        host: 'redis-db',
        port: 6379,
      },
    }),
  ],
  exports: [
    BullModule.registerQueue({
      name: 'send-email-confirmation',
    }),
    SendEmailConfirmationConsumerService,
    SendEmailConfirmationProducerService,
  ],
  providers: [
    JwtService,
    SendEmailConfirmationConsumerService,
    SendEmailConfirmationProducerService,
  ],
})
export class CommonModule {}
