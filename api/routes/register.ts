import Router from 'express';
import registerController from '../controllers/register';

const router = Router();

router.post('/', registerController);

export default router;
