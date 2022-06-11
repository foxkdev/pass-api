import { IsEnum, IsNotEmpty } from 'class-validator';
import { SecretTypes } from './secret-types';
export class CreateSecretDto {
  @IsEnum(SecretTypes, { message: 'secret type is invalid' })
  type: SecretTypes;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  content: object;
}
