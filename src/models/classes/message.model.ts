export type MessageType = {
  TYPE_TEXT: 'text'
};

export interface IReadMessage {
  _id?: string;
  readByUserId: string;
  readAt: Date;
}

export interface IMessage {
  _id?: string;
  chatRoomId: string;
  message: {
    messageText: string
  };
  type: string;
  postedByUser: string;
  readByRecipients: IReadMessage[]
};

