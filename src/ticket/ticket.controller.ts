import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateTicketDto } from './dto/create.ticket.dto';
import { UpdateTicketStatusDto } from './dto/update.ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService : TicketService) {}


    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createTicketDto : CreateTicketDto) {
        return this.ticketService.create(createTicketDto);
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id')id : string) {
         return this.ticketService.remove(id);
    }
    @Get('client/:clientId')
    @UseGuards(JwtAuthGuard)
    getTicketsByClientId(@Param('clientId') clientId : string) {
        return this.ticketService.getTicketsByClientId(clientId);
    }
    @Post(':jiraIssueId')
    @UseGuards(JwtAuthGuard)
    update(@Param('jiraIssueId')jiraIssueId : string ,@Body() updateTicketStatusDto : UpdateTicketStatusDto) {
        return this.ticketService.update(jiraIssueId ,updateTicketStatusDto)
    }
    
}
