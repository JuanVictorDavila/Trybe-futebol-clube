import { Router } from 'express';
import LeaderBoardController from '../database/controllers/leaderBoardController';

const router = Router();

router.get('/leaderboard/home', LeaderBoardController.getHomeMatches);
router.get('/leaderboard/away', LeaderBoardController.getAwayMatches);
router.get('/leaderboard', LeaderBoardController.getMatches);

export default router;