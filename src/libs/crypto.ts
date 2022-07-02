import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { Helpers } from './helpers';
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
    const decrypted = decryptedText.toString();
    const regex = /^[A-Za-z0-9:\/?=\[\]\{\}\"\'\, ]+$/;
    if (!regex.test(decrypted)) {
      throw Error('decrypt: characters invalids');
    }
    return decrypted;
  }

  static async encryptObject(content, tokenEncryption) {
    const contentEncrypted = content;
    for (const item in content) {
      const value = content[item];
      contentEncrypted[item] = await this.encrypt(
        Helpers.toString(value),
        tokenEncryption,
      );
    }
    return contentEncrypted;
  }

  static async decryptObject(content, tokenEncryption) {
    const contentDecrypted = content;
    for (const item in content) {
      const value = await this.decrypt(content[item], tokenEncryption);
      contentDecrypted[item] = Helpers.toObject(value);
    }
    return contentDecrypted;
  }
}
