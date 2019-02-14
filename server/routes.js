import { Router } from 'express';
import eventsRoutes from './events/routes';
const router = Router();

// Mount Events routes at /events
router.use('/events', eventsRoutes);

export default router;
