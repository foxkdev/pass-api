import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
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
  async findAll(): Promise<any[]> {
    return this.secretService.getAll();
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
