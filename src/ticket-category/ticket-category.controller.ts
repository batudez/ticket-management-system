import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateTicketCategoryDto } from './dto/create.ticketcategory.dto';
import { UpdateTicketCategoryDto } from './dto/update.ticketcategory.dto';
import { TicketCategoryService } from './ticket-category.service';

@Controller('ticket-category')
export class TicketCategoryController {
    constructor(private readonly ticketCategoryService : TicketCategoryService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createTicketCategoryDto : CreateTicketCategoryDto) {
        return this.ticketCategoryService.create(createTicketCategoryDto);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.ticketCategoryService.findAll();
    }
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id : string , @Body() updateTicketCategoryDto : UpdateTicketCategoryDto) {
          return this.ticketCategoryService.update(+id , updateTicketCategoryDto);
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id')id : string) {
        return this.ticketCategoryService.remove(+id);
    }

    
}
