import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JiraModule } from './jira/jira.module';
import { JiraService } from './jira/jira.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProjectModule } from './project/project.module';
import { ProjectService } from './project/project.service';
import { TicketCategoryModule } from './ticket-category/ticket-category.module';
import { TicketGateway } from './ticket/ticket.gateway';
import { TicketModule } from './ticket/ticket.module';
import { TicketService } from './ticket/ticket.service';

@Module({
  imports: [AuthModule, PrismaModule, TicketCategoryModule,
    JiraModule, ProjectModule,HttpModule, TicketModule,
    ConfigModule.forRoot({
      isGlobal : true,
      expandVariables: true,
    }) ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JiraService, TicketService, ProjectService,TicketGateway],
})
export class AppModule {}
