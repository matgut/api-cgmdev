import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/userController";
import { authJwt, verifyLogin } from "../middlewares";
import * as validationAll from '../middlewares/validationAll';

router.post(
          "/",
          [
            authJwt.verifyToken,
            authJwt.isAdmin,
            verifyLogin.checkRolesExisted,
            verifyLogin.checkDuplicateUsernameOrEmail
          ],
          usersCtrl.createUser
        )
        .get("/",
        [
          authJwt.verifyToken,
          authJwt.isAdmin,
        ],
        usersCtrl.getUsers)
        .post('/find',
        [
          authJwt.verifyToken,
          authJwt.isAdmin
        ],
        usersCtrl.getUserByIdEmailUsername);



export default router;