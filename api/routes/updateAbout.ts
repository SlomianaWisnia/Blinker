import Router from 'express';
import updateAboutController from '../controllers/updateAbout';

const router = Router();

router.put('/', updateAboutController);

export default router;
