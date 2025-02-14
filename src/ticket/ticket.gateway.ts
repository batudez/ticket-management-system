import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
    cors : {
        origin : '*',
    },
})
@Injectable()
export class TicketGateway implements OnModuleInit {
    @WebSocketServer()
    server : Server;

    onModuleInit() {
        this.server.on('connection',(socket) => {
            console.log(`Client connected : ${socket.id}`);
        });
    }

    notifyClient(clientId : string , ticketData : any) {
        this.server.to(clientId).emit('newTicket',ticketData);
    }

    @SubscribeMessage('registerClient')
    handleRegisterClient(@MessageBody() clientId : string, @ConnectedSocket() client : Socket) {
        client.join(clientId);
        console.log(`Client ${clientId} registered and online`);
    }
}