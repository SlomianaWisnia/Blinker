import aes256 from 'aes256';
import config from '../utils/config';
import log from './log';

if (!config.ENCRYPT_SECRET) {
  log.error({ label: 'Encrypt', message: 'ENCRYPT_SECRET environment variable is not set!' });
  process.exit(0);
}

const encrypt = async (msg: string) => {
  if (typeof msg !== 'string') {
    throw new Error('Message has to be a string!');
  }

  return aes256.encrypt(config.ENCRYPT_SECRET, msg);
};

const decrypt = async (msg: string) => {
  if (typeof msg !== 'string') {
    throw new Error('Message has to be a string!');
  }

  return aes256.decrypt(config.ENCRYPT_SECRET, msg);
};

export { encrypt, decrypt };
