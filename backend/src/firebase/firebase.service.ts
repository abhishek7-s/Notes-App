import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly adminApp: admin.app.App;
  
  constructor() {
    if (!admin.apps.length) {
      this.adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
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