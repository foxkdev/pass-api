import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SecretService } from './secret.service';
// import { CreateCatDto } from './dto/create-cat.dto';
import { CreateSecretDto } from './dto/create-secret.dto';

@Controller('secrets')
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @Post()
  async create(@Body() createSecretDto: CreateSecretDto) {
    return await this.secretService.create(createSecretDto);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.secretService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return this.secretService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.secretService.delete(id);
  }
}
