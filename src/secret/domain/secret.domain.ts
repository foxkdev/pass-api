import { Crypto } from 'src/libs/crypto';
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
    const { value } = this.content;
    const valueEncrypted = await Crypto.encrypt(value, tokenEncryption);
    this.content = {
      value: valueEncrypted,
    };
    return this.content;
  }

  async decryptContent(tokenEncryption) {
    const { value } = this.content;
    const valueDecrypted = await Crypto.decrypt(value, tokenEncryption);
    return {
      value: valueDecrypted,
    };
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
