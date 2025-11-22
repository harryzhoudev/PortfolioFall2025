import { Router } from 'express';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); // ✅ disk storage

import {
  getAbout,
  updateResume,
  updateProfilePic,
  upsertAbout,
} from '../controllers/about.controller';

const router = Router();

router.get('/', getAbout);
router.put('/', upsertAbout);
router.put('/profile-pic', upload.single('file'), updateProfilePic);
router.put('/resume', upload.single('file'), updateResume);

export default router;
