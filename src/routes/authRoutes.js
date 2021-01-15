import { Router } from 'express';

const router = Router();

import * as authCtrl from '../controllers/authController';

router.post('/register',authCtrl.registerUser)
      .post('/login',authCtrl.login);


export default router;