import { Router } from 'express';
import MatchesController from '../database/controllers/matchesController';
import CheckAuthorization from '../middlewares/checkAuthorization';

const router = Router();

router.get('/matches', MatchesController.getAll);
router.post('/matches', CheckAuthorization.jwtValidator, MatchesController.createMatch);
router.patch('/matches/:id/finish', MatchesController.changeMatchStatus);
router.patch('/matches/:id', MatchesController.updateGoals);

export default router;