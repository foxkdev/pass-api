import { BadRequestException } from '@nestjs/common';

import { Crypto } from 'src/libs/crypto';

export const LOGIN_TYPE = 'LOGIN';

export class Login {
  id: string;
  name: string;
  type: string;
  flags: any;
  content: any;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, name, flags, content, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.type = LOGIN_TYPE;
    this.flags = flags;
    this.setContent(content);
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static build(password) {
    return new Login(password);
  }

  setContent(content) {
    const { urls, username, password } = content;
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

  async encryptContent(tokenEncryption) {
    this.content = await Crypto.encryptObject(this.content, tokenEncryption);
  }

  async decryptContent(tokenEncryption) {
    this.content = await Crypto.decryptObject(this.content, tokenEncryption);
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      flags: this.flags,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
