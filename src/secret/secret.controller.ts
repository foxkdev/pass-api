import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SecretService } from './secret.service';
// import { CreateCatDto } from './dto/create-cat.dto';
import { CreateSecretDto } from './dto/create-secret.dto';
import { UpdateSecretDto } from './dto/update-secret.dto';

@Controller('secrets')
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @Post()
  async create(
    @Body() createSecretDto: CreateSecretDto,
    @Headers('token-encryption') tokenEncryption,
  ) {
    return await this.secretService.create(createSecretDto, tokenEncryption);
  }

  @Get()
  async findAll(@Query('q') filters = '') {
    let filtersParsed: any = filters;
    if (filtersParsed !== '') {
      filtersParsed = JSON.parse(Buffer.from(filters, 'base64').toString());
    }

    const items = await this.secretService.getAll(filtersParsed);
    return items.map((item: any) => item.toObject());
  }

  @Get('/types')
  async getTypes() {
    return {
      login: {
        key: 'LOGIN',
        global: [
          {
            key: 'name',
            name: 'name',
            type: 'text',
            secret: false,
            encrypted: false,
            canCopy: false,
          },
        ],
        flags: [
          {
            key: 'flags.website',
            name: 'website',
            type: 'text',
            secret: false,
            encrypted: false,
            canCopy: false,
          },
        ],
        content: [
          {
            key: 'content.urls',
            name: 'urls',
            type: 'array',
            secret: true,
            encrypted: true,
            canCopy: false,
          },
          {
            key: 'content.username',
            name: 'username',
            type: 'text',
            secret: true,
            encrypted: true,
            canCopy: true,
          },
          {
            key: 'content.password',
            name: 'password',
            type: 'text',
            secret: true,
            encrypted: true,
            canCopy: true,
          },
        ],
      },
      secret: {
        key: 'SECRET',
        global: [
          {
            key: 'name',
            name: 'name',
            type: 'text',
            secret: false,
            encrypted: false,
            canCopy: false,
          },
        ],
        flags: [
          {
            key: 'flags.environment',
            name: 'environment',
            type: 'text',
            secret: false,
            encrypted: false,
            canCopy: false,
          },
        ],
        content: [
          {
            key: 'content.value',
            name: 'value',
            type: 'text',
            secret: true,
            encrypted: true,
            canCopy: true,
          },
        ],
      },
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return this.secretService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSecretDto: UpdateSecretDto,
    @Headers('token-encryption') tokenEncryption,
  ): Promise<any> {
    return this.secretService.update(id, updateSecretDto, tokenEncryption);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.secretService.delete(id);
  }

  @Get(':id/decrypted')
  async getDecrypted(
    @Param('id') id: string,
    @Headers('token-encryption') tokenEncryption,
  ) {
    return await this.secretService.getById(id, tokenEncryption);
  }
}
