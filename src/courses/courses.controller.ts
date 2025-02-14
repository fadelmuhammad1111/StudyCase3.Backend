import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
async findAll(@Query('search') search?: string, @Query('deleted') deleted?: string) {
  return this.prismaService.course.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search } },
                { instructor: { contains: search } },
                { semester: { contains: search } },
                { schedule: { contains: search } },
                { status: { contains: search } },
              ],
            }
          : {},
        {
          deletedAt: deleted === "true" ? { not: null } : null,
        },
      ],
    },
  });
}


  @Post()
  async create(@Body() courseData: any) {
    try {
      return await this.prismaService.course.create({ data: courseData });
    } catch (error) {
      throw new InternalServerErrorException('Gagal menambahkan course');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: any) {
    return this.prismaService.course.update({
      where: { id },
      data: updateData,
    });
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    return this.prismaService.course.update({
      where: { id },
      data: { deletedAt: new Date() }, // Set timestamp untuk soft delete
    });
  }

  @Put(':id/restore')
  async restore(@Param('id') id: string) {
    return this.prismaService.course.update({
      where: { id },
      data: { deletedAt: null }, // Kembalikan deletedAt menjadi null untuk restore
    });
  }
}
