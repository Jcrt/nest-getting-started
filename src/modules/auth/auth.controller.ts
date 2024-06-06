import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos';

@Controller({
  path: 'auth'
})
export class AuthController{
  constructor(private authService: AuthService) { }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(
    // HERE U CAN USE PIPES TO FORMAT OR VALIDATE YOUR DATA AND U CAN TOO GET EACH PROPERTY FROM YOUR BODY (IF IT'S JSON)
    // @Body('email', ParseIntPipe) email: string, 
    // @Body('password') password: string
    @Body() signUpDto: SignUpDto
  ) {

    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn (@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}