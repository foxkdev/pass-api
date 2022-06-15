import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { SecretTypes } from './secret-types';
export class CreateSecretDto {
  @IsEnum(SecretTypes, { message: 'secret type is invalid' })
  type: SecretTypes;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  flags?: object;

  @IsNotEmpty()
  content: object;
}
