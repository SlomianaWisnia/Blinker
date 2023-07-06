import Router from 'express';
import sendMessageController from '../controllers/sendMessage';

const router = Router();

router.put('/:id', sendMessageController);

export default router;
