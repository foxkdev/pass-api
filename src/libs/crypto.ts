import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export class Crypto {
  static async encrypt(textToEncrypt, password, random = false) {
    const iv = random
      ? randomBytes(16)
      : Buffer.from(process.env.CRYPTO_IV, 'hex');

    const salt = random
      ? randomBytes(64)
      : Buffer.from(process.env.CRYPTO_SALT, 'hex');

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(password, salt, 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    return encryptedText.toString('hex');
  }

  static async decrypt(encryptedText, password, random = false) {
    const iv = random
      ? randomBytes(16)
      : Buffer.from(process.env.CRYPTO_IV, 'hex');

    const salt = random
      ? randomBytes(64)
      : Buffer.from(process.env.CRYPTO_SALT, 'hex');
    const key = (await promisify(scrypt)(password, salt, 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);
    return decryptedText.toString();
  }

  static async encryptObject(content, tokenEncryption) {
    const contentEncrypted = content;
    for (const item in content) {
      const value = content[item];
      contentEncrypted[item] = await this.encrypt(
        typeof value === 'string' ? value : JSON.stringify(value),
        tokenEncryption,
      );
    }
    return contentEncrypted;
  }

  static async decryptObject(content, tokenEncryption) {
    const contentDecrypted = content;
    for (const item in content) {
      let value = await this.decrypt(content[item], tokenEncryption);
      try {
        value = JSON.parse(value);
      } catch {}
      contentDecrypted[item] = value;
    }
    return contentDecrypted;
  }
}
