import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type SecretDocument = Secret & Document;

@Schema()
export class Secret {
  @Prop({
    type: String,
    default: function getUUID() {
      return uuidv4();
    },
  })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop({ type: Object })
  flags: object;

  @Prop({ type: Object })
  content: object;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const SecretSchema = SchemaFactory.createForClass(Secret);
