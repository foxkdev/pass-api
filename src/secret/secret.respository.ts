import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { instanceDomainByType } from './domain/instance-domain-by-type';
import { Login } from './domain/login.domain';
import { Secret } from './domain/secret.domain';
import { Secret as SecretModel, SecretDocument } from './schemas/secret.schema';

@Injectable()
export class SecretRepository {
  constructor(
    @InjectModel(SecretModel.name)
    private secretModel: Model<SecretDocument>,
  ) {}

  async findAll(): Promise<Array<Login | Secret | []>> {
    const secrets = await this.secretModel.find().exec();
    return secrets.map((secret) => this.toDomain(secret));
  }

  async findById(id: string): Promise<Login | Secret> {
    const secret = await this.secretModel.findOne({ _id: id });
    return secret ? this.toDomain(secret) : null;
  }

  async create(secret: Login | Secret): Promise<Login | Secret> {
    const newSecret = this.secretModel.create(this.toModel(secret));
    return this.toDomain(newSecret);
  }

  async update(secret) {
    await this.secretModel.findOneAndUpdate(
      { _id: secret.id },
      this.toModel(secret),
    );
    return secret;
  }

  async delete(id: string) {
    const deleted = await this.secretModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deleted;
  }

  toDomain(secret): Login | Secret {
    return instanceDomainByType(secret.type, {
      id: secret._id,
      type: secret.type,
      name: secret.name,
      content: secret.content,
      createdAt: secret.createdAt,
      updatedAt: secret.updatedAt,
    });
  }

  toModel(secret: Login | Secret) {
    return secret.toObject();
  }
}
