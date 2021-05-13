import admin from 'firebase-admin';
import logger from '../utils/logger';
import AppSecrets from '../utils/secrets';

const config = {
  type: AppSecrets.FIREBASE_TYPE,
  projectId: AppSecrets.FIREBASE_PROJECT_ID,
  privateKeyId: AppSecrets.FIREBASE_PRIVATE_KEY_ID,
  privateKey: JSON.parse(AppSecrets.FIREBASE_PRIVATE_KEY),
  clientEmail: AppSecrets.FIREBASE_CLIENT_EMAIL,
  clientId: AppSecrets.FIREBASE_CLIENT_ID,
  authUri: AppSecrets.FIREBASE_AUTH_URI,
  tokenUri: AppSecrets.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: AppSecrets.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: AppSecrets.FIREBASE_CLIENT_X509_CERT_URL,
};

// logger.info(config.privateKey);

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: AppSecrets.FIREBASE_DATABASE_URL,
});

export const auth = admin.auth();
export const firestore = admin.firestore();
