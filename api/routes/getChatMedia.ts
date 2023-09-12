import Router from 'express';
import getChatMediaController from '../controllers/getChatMedia';

const router = Router();

router.get('/:id/:source', getChatMediaController);

export default router;
