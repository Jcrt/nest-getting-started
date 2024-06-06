import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({}), 
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers:[AuthController], 
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {

}