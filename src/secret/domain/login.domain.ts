import { BadRequestException } from '@nestjs/common';
import { Secret } from './secret.domain';

export const LOGIN_TYPE = 'LOGIN';

export class Login extends Secret {
  id: string;
  name: string;
  type: string;
  content: object;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, name, content, createdAt, updatedAt }) {
    super({ id, name, type: LOGIN_TYPE, content: {}, createdAt, updatedAt });
    this.id = id;
    this.name = name;
    this.setContent(content);
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static build(password) {
    return new Login(password);
  }

  setContent({ urls, username, password }) {
    if (!urls) {
      throw new BadRequestException(`field content.urls required`);
    }
    if (!username) {
      throw new BadRequestException(`field content.username required`);
    }
    if (!password) {
      throw new BadRequestException(`field content.password required`);
    }
    this.content = {
      urls,
      username,
      password,
    };
  }
}
