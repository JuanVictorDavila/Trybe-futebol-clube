import { Router } from 'express';
import LoginController from '../database/controllers/loginController';
import LoginMiddleware from '../middlewares/loginMiddleware';

const router = Router();

router.get('/login/validate', LoginController.validator);
router.post('./login', LoginController.postLogin);
router.post('/login', LoginMiddleware.checkInfo, LoginController.postLogin);

export default router;