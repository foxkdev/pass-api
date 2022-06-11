import { IsEnum, IsNotEmpty } from 'class-validator';

export enum SecretType {
  LOGIN = 'LOGIN',
}

export class CreateSecretDto {
  @IsEnum(SecretType, { message: 'secret type is invalid' })
  type: SecretType;

  @IsNotEmpty()
  name: number;

  @IsNotEmpty()
  content: object;
}
