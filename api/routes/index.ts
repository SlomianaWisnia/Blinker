import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import specs from '../docs/rest/index';
import config from '../utils/config';

import auth from './auth';
import authorization from '../middleware/express/auth';
import register from './register';
import listUsers from './listUsers';
import getLastMessages from './getLastMessages';
import getChatMessages from './getChatMessages';
import getChatMedia from './getChatMedia';
import sendMessage from './sendMessage';
import authVerify from './auth-verify';
import logOut from './logOut';
import updateAvatar from './updateAvatar';
import deleteAvatar from './deleteAvatar';
import updateUsername from './updateUsername';
import updateAbout from './updateAbout';

const router = Router();

if (config.NODE_ENV === 'development') {
  router.use('/docs/rest', swaggerUI.serve, swaggerUI.setup(specs));
}
router.use('/api/auth', auth);
router.use('/api/register', register);
router.use('/api/list-users', listUsers);
router.use('/api/get-last-messages', [authorization, getLastMessages]);
router.use('/api/get-chat-media', [authorization, getChatMedia]);
router.use('/api/messages', [authorization, getChatMessages]);
router.use('/api/send-message', [authorization, sendMessage]);
router.use('/api/auth-verify', [authorization, authVerify]);
router.use('/api/user/update-avatar', [authorization, updateAvatar]);
router.use('/api/user/delete-avatar', [authorization, deleteAvatar]);
router.use('/api/user/update-username', [authorization, updateUsername]);
router.use('/api/user/update-about', [authorization, updateAbout]);
router.use('/api/logout', logOut);

export default router;
