import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamOwnerDocument = TeamOwnerPersistence & Document;

@Schema({ collection: 'team-owners', timestamps: true })
export class TeamOwnerPersistence {
  @Prop({ required: true, length: 25 })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  emailVerified: boolean;
}

export const TeamOwnerSchema =
  SchemaFactory.createForClass(TeamOwnerPersistence);
