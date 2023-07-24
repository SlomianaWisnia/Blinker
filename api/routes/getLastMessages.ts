import Router from 'express';
import getLastMessagesController from '../controllers/getLastMessages';

const router = Router();

router.get('/:id', getLastMessagesController);

export default router;
