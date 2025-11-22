import { Router } from 'express';
import { getHome, updateHomeContent } from '../controllers/home.controller';
// import { requireAuth, requireAdmin } from "../middleware/auth.middleware"; // later

const router = Router();

// Public route
router.get('/', getHome);

// Protected admin route (later you can add middlewares)
// router.put("/", requireAuth, requireAdmin, upsertHomeContent);
router.put('/', updateHomeContent);

export default router;
