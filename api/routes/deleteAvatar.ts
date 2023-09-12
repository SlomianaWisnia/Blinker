import Router from 'express';
import deleteAvatarController from '../controllers/deleteAvatar';

const router = Router();

router.delete('/', deleteAvatarController);

export default router;
