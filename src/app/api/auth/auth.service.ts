import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'user',
      },
    });
    return { message: 'User berhasil dibuat', user: newUser };
  }
}
