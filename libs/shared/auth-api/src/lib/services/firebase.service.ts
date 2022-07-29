import { Injectable } from '@nestjs/common';
import { cert, initializeApp } from 'firebase-admin/app';

@Injectable()
export class FirebaseService {
  public readonly app = initializeApp({
    credential: cert(require('firebase-private-key.json')),
  });
}
