import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Secret as SecretModel, SecretSchema } from './schemas/secret.schema';
import { SecretController } from './secret.controller';
import { SecretRepository } from './secret.respository';
import { SecretService } from './secret.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SecretModel.name, schema: SecretSchema },
    ]),
  ],
  controllers: [SecretController],
  providers: [SecretService, SecretRepository],
})
export class SecretModule {}
