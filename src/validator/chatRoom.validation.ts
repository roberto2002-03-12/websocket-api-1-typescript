import Joi from 'joi';

const userIds = Joi.array();
const chatRoomType = Joi.string().valid('consumer-to-consumer', 'consumer-to-support');
const chatInitiator = Joi.string();
const messageText = Joi.string().max(255);
const page = Joi.number().min(1);
const limit = Joi.number().min(1);

export const createChatRoomSchema = Joi.object({
  userIds: userIds.required(),
  chatRoomType: chatRoomType.required(),
  // chatInitiator: chatInitiator.required()
});

export const postMessageSchema = Joi.object({
  messageText: messageText.required()
});

export const sendRoomIdSchema = Joi.object({
  roomId: chatInitiator.required()
});

export const optionsQuerySchema = Joi.object({
  page: page.required(),
  limit: limit.required()
});