import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketCategoryDto } from './dto/create.ticketcategory.dto';
import { UpdateTicketCategoryDto } from './dto/update.ticketcategory.dto';

@Injectable()
export class TicketCategoryService {
    constructor(private prisma : PrismaService) {}

    async create(createTicketCategoryDto : CreateTicketCategoryDto) {
        return this.prisma.ticketCategory.create({
            data: {
                categoryName: createTicketCategoryDto.categoryName
            }
        });
    }
    //Bir dto ile yapılabilir.
    async findAll() {
        return this.prisma.ticketCategory.findMany();
    }
    async update(categoryId : number , updateTicketCategoryDto : UpdateTicketCategoryDto) {
        return this.prisma.ticketCategory.update({
            where : { categoryId },
            data : updateTicketCategoryDto,
        })
    }
    async remove(categoryId : number) {
        return this.prisma.ticketCategory.delete({
            where: {categoryId}
        })
    }

}
