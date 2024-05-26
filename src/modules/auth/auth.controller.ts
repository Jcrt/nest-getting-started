import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller({
  path: 'auth'
})
export class AuthController{
  constructor(private authService: AuthService) { }

  @Post('signup')
  signUp() {
    return this.authService.signIn();
  }

  @Post('signin')
  signIn () {
    return this.authService.signIn();
  }
}