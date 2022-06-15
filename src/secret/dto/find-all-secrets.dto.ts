import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SecretTypes } from './secret-types';
export class FindAllSecretsDto {
  @IsEnum(SecretTypes, { message: 'secret type is invalid' })
  @IsOptional()
  type?: SecretTypes;

  @IsString()
  @IsOptional()
  name?: string;
}
