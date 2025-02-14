import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))  // Aktifkan validasi DTO
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
