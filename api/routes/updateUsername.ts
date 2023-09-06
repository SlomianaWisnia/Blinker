import Router from 'express';
import updateUsernameController from '../controllers/updateUsername';

const router = Router();

router.put('/', updateUsernameController);

export default router;
