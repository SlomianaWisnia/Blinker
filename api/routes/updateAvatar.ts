import Router from 'express';
import updateAvatarController from '../controllers/updateAvatar';

const router = Router();

router.put('/', updateAvatarController);

export default router;
