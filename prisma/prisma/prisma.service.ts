import { Injectable, OnModuleInit, OnModuleDestroy} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Called when the application is initialized
  async onModuleInit() {
    await this.$connect(); // Use the this keyword to access the $connect method
    console.log('Connected to the database');
  }

  // Called when the application is destroyed
  async onModuleDestroy() {
    await this.$disconnect(); // Use the this keyword to access the $disconnect method
    console.log('Disconnected from the database');
  }
}