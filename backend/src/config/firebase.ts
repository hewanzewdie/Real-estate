import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';
import { FirebaseOptions } from 'firebase/app';

dotenv.config();

interface FirebaseConfig extends FirebaseOptions {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.API_KEY || '',
  authDomain: process.env.AUTH_DOMAIN || '',
  projectId: process.env.PROJECT_ID || '',
  storageBucket: process.env.STORAGE_BUCKET || '',
  messagingSenderId: process.env.MESSAGING_SENDER_ID || '',
  appId: process.env.APP_ID || ''
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };