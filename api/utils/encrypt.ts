import aes256 from 'aes256';
import dotenv from 'dotenv';
import log from './log';

dotenv.config({ path: `../config/${process.env.NODE_ENV}.env` });

if (!process.env.ENCRYPT_SECRET) {
  log.error({ label: 'Encrypt', message: 'ENCRYPT_SECRET environment variable is not set!' });
  process.exit(0);
}

const encrypt = async (msg: string) => {
  if (typeof msg !== 'string') {
    throw new Error('Message has to be a string!');
  }

  return aes256.encrypt(process.env.ENCRYPT_SECRET, msg);
};

const decrypt = async (msg: string) => {
  if (typeof msg !== 'string') {
    throw new Error('Message has to be a string!');
  }

  return aes256.decrypt(process.env.ENCRYPT_SECRET, msg);
};

export { encrypt, decrypt };
