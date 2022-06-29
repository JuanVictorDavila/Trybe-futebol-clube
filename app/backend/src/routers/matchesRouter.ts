import { Router } from 'express';
import MatchesController from '../database/controllers/matchesController';
import CheckAuth from '../middlewares/checkAuth';

const router = Router();

router.get('/matches', MatchesController.getAll);
router.post('/matches', CheckAuth.jwtValidator, MatchesController.createMatch);

export default router;