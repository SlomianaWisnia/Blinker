import Router from 'express';
import auth from '../middleware/auth';
import getLastMessagesController from '../controllers/getLastMessages';

const router = Router();

router.get('/', auth, getLastMessagesController);

export default router;
