import { Module } from '@nestjs/common';
import { FirebaseService } from './services';
import { FirebaseAuthStrategy } from './strategies/firebase.strategy';

@Module({
  imports: [],
  providers: [FirebaseService, FirebaseAuthStrategy],
  exports: [],
})
export class SharedAuthApiModule {}
