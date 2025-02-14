import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketCategoryController } from './ticket-category.controller';
import { TicketCategoryService } from './ticket-category.service';

@Module({
  controllers: [TicketCategoryController],
  providers: [TicketCategoryService , PrismaService]
})
export class TicketCategoryModule {}
