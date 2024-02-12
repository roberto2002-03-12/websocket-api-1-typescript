import { Request, Response } from 'express'

export default {
  initiate: async (req: Request, res: Response) => { },
  postMessage: async (req: Request, res: Response) => { },
  getRecentConversation: async (req: Request, res: Response) => { },
  getConversationByRoomId: async (req: Request, res: Response) => { },
  markConversationReadByRoomId: async (req: Request, res: Response) => { },
}