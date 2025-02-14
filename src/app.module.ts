import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma/prisma.module';
import { AuthModule } from './app/api/auth/auth.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [AuthModule, PrismaModule, CoursesModule], // Masukkan PrismaModule
})
export class AppModule {}
