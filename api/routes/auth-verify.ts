import Router from 'express';
import authVerifyController from '../controllers/auth-verify';

const router = Router();

router.post('/', authVerifyController);

export default router;
