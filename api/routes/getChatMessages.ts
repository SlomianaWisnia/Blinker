import Router from 'express';
import getChatMessagesController from '../controllers/getChatMessages';

const router = Router();

router.get('/:id/:start/:limit', getChatMessagesController);

export default router;
