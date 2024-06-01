import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto as SignUpDto } from './dtos';

@Controller({
  path: 'auth'
})
export class AuthController{
  constructor(private authService: AuthService) { }

  @Post('signup')
  signUp(
    // HERE U CAN USE PIPES TO FORMAT OR VALIDATE YOUR DATA AND U CAN TOO GET EACH PROPERTY FROM YOUR BODY (IF IT'S JSON)
    // @Body('email', ParseIntPipe) email: string, 
    // @Body('password') password: string
    @Body() signUpDto: SignUpDto
  ) {

    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn () {
    return this.authService.signIn();
  }
}