import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async register(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;
    const auth = this.firebaseService.auth;
    const firestore = this.firebaseService.firestore;

    try {
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: name,
      });

      await firestore.collection('users').doc(userRecord.uid).set({
        id: userRecord.uid,
        name,
        email,
      });

      return {
        message: 'User registered successfully!',
        userId: userRecord.uid,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(uid: string) {
    const firestore = this.firebaseService.firestore;
    try {
      const userDoc = await firestore.collection('users').doc(uid).get();

      if (!userDoc.exists) {
        throw new NotFoundException('User profile not found in Firestore.');
      }

      return userDoc.data();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}