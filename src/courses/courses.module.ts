import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { CoursesController } from './courses.controller';

@Module({
  controllers: [CoursesController],
  providers: [PrismaService],
})
export class CoursesModule {}
