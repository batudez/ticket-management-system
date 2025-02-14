import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TicketGateway } from 'src/ticket/ticket.gateway';
import { TicketService } from 'src/ticket/ticket.service';
import { JiraService } from './jira.service';

@Module({
    providers: [JiraService,TicketService,TicketGateway],
    exports: [JiraService],
    imports: [HttpModule,PrismaModule]
})
export class JiraModule {}
