import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSecretDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  flags?: object;

  @IsNotEmpty()
  content: object;
}
