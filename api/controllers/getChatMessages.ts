import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import mongoose from 'mongoose';
import log from '../utils/log';
import ChatRoom from '../models/ChatRoom';
import Message from '../interfaces/models/Message';
import { decrypt } from '../services/encrypt';
const router = Router();

router.get('/:id/:start/:limit', async (req:RequestSession, res:Response) => {
  try {
      if (!req.params.id || !req.params.start || !req.params.limit)
        return res.status(400).json({ msg: 'Parameters not set!' });

      const { id, start, limit } = req.params;
      const { userId } = req.session;

      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ msg: 'Invalid Chat Room ID!' });

      if (!await ChatRoom.exists({ _id: id, members: userId }))
        return res.status(400).json({ msg: 'Invalid Chat Room ID!' });

      if (!(+start >= 0) || !(+limit > 0))
        return res.status(400).json({ msg: 'Invalid parameters!' });

      const result = await ChatRoom.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $project: {
            messages: {
              $slice: [
                { $reverseArray: "$messages" },
                parseInt(start),
                parseInt(limit) + 1,
              ],
            },
          },
        },
        { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "users",
            localField: "messages.from",
            foreignField: "_id",
            as: "messages.from",
          },
        },
        {
          $match: {
            messages: { $exists: true, $ne: [] },
          },
        },
        {
          $project: {
            "messages.from": {
              $map: {
                input: "$messages.from",
                in: {
                  username: "$$this.username",
                  avatar: "$$this.avatar",
                  avatarHex: "$$this.avatarHex",
                },
              },
            },
            "messages.message": 1,
            "messages.source": 1,
            "messages.createdAt": 1,
          },
        },
        {
          $project: {
            "messages.from._id": 0,
            "messages.from.__v": 0,
          },
        },
        {
          $group: {
            _id: "$_id",
            messages: { $push: "$messages" },
          },
        },
        {
          $project: {
            messages: { $slice: ["$messages", 0, parseInt(limit)] },
            reachedMax: {
              $cond: {
                if: { $gte: [{ $size: "$messages" }, parseInt(limit) + 1] },
                then: false,
                else: true,
              },
            },
          },
        },
        {
          $addFields: {
            messages: {
              $map: {
                input: "$messages",
                in: {
                  message: "$$this.message",
                  source: "$$this.source",
                  createdAt: "$$this.createdAt",
                  from: { $arrayElemAt: ["$$this.from", 0] },
                },
              },
            },
          },
        },
      ]);     
        
      const decryptedMessagesPromises = result[0].messages.map(async (message:Message) => {
        return message.message ? {
          ...message,
          message: await decrypt(message.message)
        } : { ...message };
      });
      const decryptedMessages = await Promise.all(decryptedMessagesPromises);
  
      result[0].messages = decryptedMessages;
  
      const { messages, reachedMax } = result[0];
      if (!messages[0].from)
        return res.json({ messages: [], reachedMax });
  
      return res.json({ messages, reachedMax });
  } catch (ex) {
      log.error({ label: 'Get Chat Messages', message: ex });
      return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
