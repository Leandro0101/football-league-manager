import { Module } from '@nestjs/common';
import { TeamOwnerModule } from './team-owner/team-owner.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [TeamOwnerModule, CommonModule],
})
export class AppModule {}
