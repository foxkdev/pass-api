import { Crypto } from 'src/libs/crypto';

export const SECRET_TYPE = 'SECRET';
export class Secret {
  id: string;
  name: string;
  type: string;
  content: any;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, name, type, content, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static build(secret) {
    return new Secret(secret);
  }

  setContent(content) {
    this.content = content;
  }
  async encryptContent(tokenEncryption) {
    this.content = await Crypto.encryptObject(this.content, tokenEncryption);
    return this.content;
  }

  async decryptContent(tokenEncryption) {
    this.content = await Crypto.decryptObject(this.content, tokenEncryption);
    return this.content;
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
