import { Injectable, NotFoundException } from '@nestjs/common';
import { Secret } from './domain/secret.domain';
import { SecretRepository } from './secret.respository';
import { v4 as uuidv4 } from 'uuid';
import { CreateSecretDto } from './dto/create-secret.dto';
import { Login } from './domain/login.domain';
import { instanceDomainByType } from './domain/instance-domain-by-type';

@Injectable()
export class SecretService {
  constructor(private secretRepository: SecretRepository) {}

  async getAll(): Promise<Array<Login | Secret | []>> {
    const secrets = await this.secretRepository.findAll();
    // return secrets.map((secret) => {
    //   return secret.toObject();
    // });
    return secrets;
  }

  async getById(id: string) {
    const secret = await this.secretRepository.findOne(id);
    if (!secret) {
      throw new NotFoundException(`secret with id ${id} not found`);
    }
    return secret;
  }

  async create({ type, name, content }: CreateSecretDto) {
    const secret = instanceDomainByType(type, {
      id: uuidv4(),
      name,
      type,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.secretRepository.create(secret);
    return secret;
  }

  async delete(id: string) {
    await this.secretRepository.delete(id);
  }
}
