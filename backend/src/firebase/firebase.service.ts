import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly adminApp: admin.app.App;
  
  constructor() {
    if (
      !process.env.FIREBASE_PROJECT_ID ||
      !process.env.FIREBASE_CLIENT_EMAIL ||
      !process.env.FIREBASE_PRIVATE_KEY
    ) {
      throw new Error('Firebase environment variables are not set.');
    }

    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    } as admin.ServiceAccount;
    
    if (!admin.apps.length) {
      this.adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      this.adminApp = admin.app();
    }
  }

  onModuleInit() {
    console.log('Firebase Admin SDK has been initialized.');
  }

  get firestore(): admin.firestore.Firestore {
    return this.adminApp.firestore();
  }

  get auth(): admin.auth.Auth {
    return this.adminApp.auth();
  }
}