import { IsNotEmpty } from 'class-validator';

export class UpdateSecretDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  content: object;
}
