import user from './user/routes';
import feed from './feed/routes';
import { Router, Response, Request, NextFunction as Next } from 'express';

const router: Router = Router();

router.use('/user', user);
router.use('/feed', feed);

router.get('/', async (req: Request, res: Response, next: Next): Promise<void> => { res.send('v0'); });

export default router;
