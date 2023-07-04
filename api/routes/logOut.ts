import Router from 'express';
import logOutController from '../controllers/logOut';

const router = Router();

router.post('/', logOutController);

export default router;
