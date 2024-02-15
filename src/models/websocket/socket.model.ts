import { Socket, Server } from 'socket.io'

interface IUserSocket {
  socketId: string;
  userId: string;
}

class WebSockets {
  users: IUserSocket[] = [];
  
  connection(client: Socket) {
    client.on('disconnect', () => {
      this.users = this.users.filter((user) => user.socketId !== client.id);
    });

    client.on('identify', (userId: string) => {
      this.users.push({
        socketId: client.id,
        userId: userId
      });
    });

    client.on("subscribe", (room: string, otherUserId: string = "") => {
      this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });

    client.on("unsubscribe", (room) => {
      client.leave(room);
    });
  };

  subscribeOtherUser(room: string, otherUserId: string) {
    const userSockets = this.users.filter(
      (user) => user.userId === otherUserId
    );

    userSockets.map((userInfo) => {
      const socketConn = globalThis.SocketServer.sockets.sockets.get(userInfo.socketId);

      if (socketConn) {
        socketConn.join(room);
      };
    });
  };

}

export default WebSockets;