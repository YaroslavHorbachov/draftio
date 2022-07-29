import { SharedAuthApiModule } from '@draftio/shared/auth-api';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'drawio_user',
      password: 'password123',
      database: 'drawio_database',
      autoLoadEntities: true,
    }),
    UsersModule,
    SharedAuthApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
