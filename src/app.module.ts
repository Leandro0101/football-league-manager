import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamOwnerModule } from './team-owner/team-owner.module';
import { MongooseModule } from '@nestjs/mongoose';

const DB_USER = process.env.MONGO_USER;
const DB_PASS = process.env.MONGO_PASS;
const DB_HOST = process.env.MONGO_HOST;
const DB_PORT = process.env.MONGO_PORT;
const DB_NAME = process.env.MONGO_DB;
const DB_URL = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

@Module({
  imports: [
    TeamOwnerModule,
    MongooseModule.forRoot(DB_URL, { authSource: 'admin' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
