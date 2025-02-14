import { Module } from '@nestjs/common';
import { JiraModule } from 'src/jira/jira.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketController } from './ticket.controller';
import { TicketGateway } from './ticket.gateway';
import { TicketService } from './ticket.service';

@Module({
    controllers: [TicketController],
    providers: [TicketService,PrismaService,TicketGateway],
    imports:[JiraModule]
})
export class TicketModule {}
