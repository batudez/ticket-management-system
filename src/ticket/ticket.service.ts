import { Injectable } from '@nestjs/common';
import { IssueType, Priority, TicketStatus } from '@prisma/client';
import { error } from 'console';
import { JiraService } from 'src/jira/jira.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create.ticket.dto';
import { UpdateTicketStatusDto } from './dto/update.ticket.dto';
import { TicketGateway } from './ticket.gateway';

@Injectable()
export class TicketService {
    constructor(private prisma : PrismaService , private jiraService : JiraService ,private ticketGateway : TicketGateway) {}

    jiraIssueIdFromJiraResponse : string
    ticketIdFromJiraResponse : string
    transitionId : string

    async create(createTicketDto : CreateTicketDto) {

        try {
            const response = await this.jiraService.createIssue(createTicketDto.projectKey, createTicketDto.summary, createTicketDto.description);
    
            this.jiraIssueIdFromJiraResponse = response.data.key;
            this.ticketIdFromJiraResponse = response.data.id;

            const project = await this.prisma.project.findUnique({
              where : {
                projectKey : createTicketDto.projectKey
              }
            })

         
            if (project && project.maxTicketValue != null && project.ticketValue != null && project.maxTicketValue >= project.ticketValue) {

              const newTicket = this.prisma.ticket.create({
                data: {
                  ticketId: this.ticketIdFromJiraResponse,
                  summary: createTicketDto.summary,
                  jiraIssueId: this.jiraIssueIdFromJiraResponse,
                  description: createTicketDto.description,
                  issueType: createTicketDto.issueType,
                  ticketStatus: createTicketDto.ticketStatus,
                  priority: createTicketDto.priority,
                  issueCreatedBy: createTicketDto.issueCreatedBy,
                  clientId: createTicketDto.clientId,
                  categoryId: createTicketDto.categoryId,
                  projectKey: createTicketDto.projectKey,
                }
              });
              
              await this.prisma.project.update({
                where : {
                  projectKey : createTicketDto.projectKey,
                },
                data : {
                  ticketValue : project.ticketValue + 1,
                }
              })

              this.ticketGateway.notifyClient(createTicketDto.clientId, (await newTicket).jiraIssueId)
              return (await newTicket).jiraIssueId;
              
          } else {
              return error;
          }
              
        } catch (error) {
            console.error("Error creating db process ", error);
            throw error;
            
        }
       

    }

    async remove(jiraIssueId : string) {

        this.jiraService.delete(jiraIssueId);
        return this.prisma.ticket.delete({
            where : {jiraIssueId}
        })
    }

    async update(jiraIssueId : string , updateTicketStatusDto : UpdateTicketStatusDto) {

        
        try {

           switch (updateTicketStatusDto.ticketStatus) {
            case "TO_DO":
                this.transitionId="11"
                break;
            case "IN_PROGRESS":
                this.transitionId = "21"
                break;
            case "RESOLVED":
                this.transitionId = "31"
                break;
            default:
                break;
           }
           
           this.jiraService.update(jiraIssueId , this.transitionId);
            
        } catch (err) {
            
           console.error('Jira Api update error: ',err.response.data || err.message);
           throw new Error('Jira Api update failed')

        }
        return await this.prisma.ticket.update({
            where : {jiraIssueId},
            data : updateTicketStatusDto
        })
        
    }

    async getTicketsByClientId(clientId : string) {
        return this.prisma.ticket.findMany({
            where : {clientId}
        })
    }

    async createOrUpdateTicketFromJira(ticketData: {
        ticketId: string;
        summary: string;
        jiraIssueId: string;
        description: string;
        issueType: IssueType;
        ticketStatus: TicketStatus;
        priority: Priority;
        issueCreatedBy: string;
        clientId: string;
        categoryId: number;
        projectKey: string;
      }) {
        //Check database
        const existingTicket = await this.prisma.ticket.findUnique({
          where: { jiraIssueId: ticketData.jiraIssueId },
        });
    
        if (existingTicket) {
          // if ticket exist update it !
          return this.prisma.ticket.update({
            where: { jiraIssueId: ticketData.jiraIssueId },
            data : ticketData,
          });
        } else {
          // No ticket then create
          return this.prisma.ticket.create({
            data: ticketData,
          });
        }
      }


    
    
}

// function getRandomNumber(min , max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
