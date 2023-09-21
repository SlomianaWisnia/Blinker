import Router from 'express';
import addFriendController from '../controllers/addFriend';

const router = Router();

router.post('/', addFriendController);

export default router;
