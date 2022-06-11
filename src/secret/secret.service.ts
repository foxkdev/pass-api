import { Injectable, NotFoundException } from '@nestjs/common';
import { Secret } from './domain/secret.domain';
import { SecretRepository } from './secret.respository';
import { v4 as uuidv4 } from 'uuid';
import { CreateSecretDto } from './dto/create-secret.dto';
import { Login } from './domain/login.domain';
import { instanceDomainByType } from './domain/instance-domain-by-type';
import { UpdateSecretDto } from './dto/update-secret.dto';

@Injectable()
export class SecretService {
  constructor(private secretRepository: SecretRepository) {}

  async getAll(): Promise<Array<Login | Secret | []>> {
    return await this.secretRepository.findAll();
  }

  async getById(id: string) {
    const secret = await this.secretRepository.findById(id);
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

  async update(id: string, { name, content }: UpdateSecretDto) {
    const secret = await this.secretRepository.findById(id);
    if (!secret) {
      throw new NotFoundException(`secret with id ${id} not found`);
    }
    secret.name = name;
    secret.setContent(content);

    await this.secretRepository.update(secret);
    return secret;
  }

  async delete(id: string) {
    await this.secretRepository.delete(id);
  }
}
