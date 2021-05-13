import logger from './logger';
import dotenv from 'dotenv';

dotenv.config();

const getSecretAndThrowIfUndefined = (secret: string) => {
  const value = process.env[secret];
  if (!value) {
    logger.error(`Please set ${secret} environment variable`);
    process.exit(1);
  }
  return value;
};

const AppSecrets = {
  // PORT: getSecretAndThrowIfUndefined('PORT'),
  FIREBASE_TYPE: getSecretAndThrowIfUndefined('FIREBASE_TYPE'),
  FIREBASE_PROJECT_ID: getSecretAndThrowIfUndefined('FIREBASE_PROJECT_ID'),
  FIREBASE_PRIVATE_KEY_ID: getSecretAndThrowIfUndefined(
    'FIREBASE_PRIVATE_KEY_ID'
  ),
  FIREBASE_PRIVATE_KEY: getSecretAndThrowIfUndefined('FIREBASE_PRIVATE_KEY'),
  FIREBASE_CLIENT_EMAIL: getSecretAndThrowIfUndefined('FIREBASE_CLIENT_EMAIL'),
  FIREBASE_CLIENT_ID: getSecretAndThrowIfUndefined('FIREBASE_CLIENT_ID'),
  FIREBASE_AUTH_URI: getSecretAndThrowIfUndefined('FIREBASE_AUTH_URI'),
  FIREBASE_TOKEN_URI: getSecretAndThrowIfUndefined('FIREBASE_TOKEN_URI'),
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: getSecretAndThrowIfUndefined(
    'FIREBASE_AUTH_PROVIDER_X509_CERT_URL'
  ),
  FIREBASE_CLIENT_X509_CERT_URL: getSecretAndThrowIfUndefined(
    'FIREBASE_CLIENT_X509_CERT_URL'
  ),
  FIREBASE_DATABASE_URL: getSecretAndThrowIfUndefined('FIREBASE_DATABASE_URL'),
};

export default AppSecrets;
