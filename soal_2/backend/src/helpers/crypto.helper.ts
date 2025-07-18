import CryptoJS from 'crypto-js';
import { GLOBAL_SECRET_KEY } from './secret-key.helper';

// ENCRYPT TEXT
const encryptText = (text: any) => {
  try {
    return CryptoJS.AES.encrypt(text.toString(), GLOBAL_SECRET_KEY).toString();
  } catch (error) {
    return (error as Error).message;
  }
};

// DECRYPT TEXT
const decryptText = (cipherText: string) => {
  try {
    return CryptoJS.AES.decrypt(
      cipherText.toString(),
      GLOBAL_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return (error as Error).message;
  }
};

export { encryptText, decryptText };
