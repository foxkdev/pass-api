import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getAll(filters: object): Promise<Array<Login | Secret | []>> {
    return await this.secretRepository.findAll(filters);
  }

  async getById(id: string, tokenEncryption = null) {
    const secret = await this.secretRepository.findById(id);
    if (!secret) {
      throw new NotFoundException(`secret with id ${id} not found`);
    }
    try {
      if (tokenEncryption) {
        await secret.decryptContent(tokenEncryption);
      }
      return secret;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async create(
    { type, name, flags, content }: CreateSecretDto,
    tokenEncryption,
  ) {
    const secret = instanceDomainByType(type, {
      id: uuidv4(),
      name,
      type,
      flags,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await secret.encryptContent(tokenEncryption);
    await this.secretRepository.create(secret);
    return secret;
  }

  async update(
    id: string,
    { name, flags, content }: UpdateSecretDto,
    tokenEncryption,
  ) {
    const secret = await this.secretRepository.findById(id);
    if (!secret) {
      throw new NotFoundException(`secret with id ${id} not found`);
    }
    secret.name = name;
    secret.flags = flags;
    secret.setContent(content);
    await secret.encryptContent(tokenEncryption);
    await this.secretRepository.update(secret);
    await secret.decryptContent(tokenEncryption);
    return secret;
  }

  async delete(id: string) {
    await this.secretRepository.delete(id);
  }
}
