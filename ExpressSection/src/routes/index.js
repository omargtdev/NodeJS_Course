import { Router } from 'express';
import adminRoutes from './admin';
import shopRoutes from './shop';

const router = Router();

router.use('/admin', adminRoutes);
router.use(shopRoutes);

export default router;
