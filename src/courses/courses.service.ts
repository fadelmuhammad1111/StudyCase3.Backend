import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany(); // Query ke database
  }

  async create(courseData: any) {
    return this.prisma.course.create({ 
      data: courseData 
    });
  }

  async update(courseId: string, updateData: any) {
    return this.prisma.course.update({
      where: { id: courseId },
      data: updateData,
    });
  }

  async delete(courseId: string) {
    return this.prisma.course.delete({
      where: { id: courseId },
    });
  }
}
