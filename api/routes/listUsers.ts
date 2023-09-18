import Router from 'express';
import listUsersController from '../controllers/listUsers';

const router = Router();

router.get('/', listUsersController);

export default router;
