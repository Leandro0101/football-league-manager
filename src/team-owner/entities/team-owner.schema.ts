import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamOwnerDocument = TeamOwner & Document;

@Schema({ collection: 'team-owners' })
export class TeamOwner {
  @Prop({ required: true, length: 25 })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const TeamOwnerSchema = SchemaFactory.createForClass(TeamOwner);
