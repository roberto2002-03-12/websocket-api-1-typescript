export type ChatRoomTypes = {
  CONSUMER_TO_CONSUMER: 'consumer-to-consumer',
  CONSUMER_TO_SUPPORT: 'consumer-to-support'
};

export interface IChatRoom {
  _id: string;
  userIds: string[];
  chatRoomType: ChatRoomTypes;
  chatInitiator: string;
};