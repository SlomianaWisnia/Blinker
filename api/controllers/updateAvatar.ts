import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import log from '../utils/log';
import multer from 'multer';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User';
const router = Router();

router.put('/', async (req:RequestSession, res:Response) => {
  try {
    const { userId } = req.session;

    const user = await User.findOne({ _id: userId }).select('username avatar');

    const path = `./media/users/${user.username}/avatar`;

    const storage = multer.diskStorage(
      {
        destination: path,
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.originalname.split('.').pop()}`)
        }
      },
    );

    const fileFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

    const fileLimit = 7 * 1024 * 1024; // 7MB

    const upload = multer({
      storage,
      limits: {
        fileSize: fileLimit
      },
      fileFilter: (req, file, cb) => {
        if (!fileFormats.includes(file.mimetype))
          return res.status(400).json({ msg: 'We support only jpg, jpeg, png and gif files!' });

        const fileSize = parseInt(req.headers['content-length']);
        
        if (fileSize > fileLimit)
          return res.status(400).json({ msg: 'We support only files up to 7MB!' });

        cb(null, true);
      }
    }).single('avatar');

    upload(req, res, async (err) => {
      if (req.file !== undefined) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ msg: err });
        } else if (err) {
          log.error({ label: 'Update Avatar', message: err });
          return res.status(500).json({ msg: 'Something went wrong! Please, try again later' });
        }

        const previousAvatar = user.avatar;
        const avatar = req.file.filename;

        await User.findOneAndUpdate({ _id: userId }, {
          avatar,
        });

        if (previousAvatar) {
          fs.unlinkSync(`${path}/${previousAvatar}`);
        }

        return res.json({ msg: 'Avatar successfully updated!' });
      }
      return res.status(400).json({ msg: 'No file provided!' });
    });
  } catch (ex) {
    log.error({ label: 'Update Avatar', message: ex });
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
