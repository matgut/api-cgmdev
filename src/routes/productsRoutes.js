import { Router } from 'express';

const router = Router();

import * as productCtrl from '../controllers/productsController';
import { authJwt } from '../middlewares';

router.get('/', productCtrl.getProduct)
      .get('/:productId', productCtrl.getProductById)
      .post('/', [authJwt.verifyToken, authJwt.isModerator], productCtrl.createProduct)
      .put('/:productId',[authJwt.verifyToken, authJwt.isAdmin], productCtrl.updateProductById)
      .delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productCtrl.deleteProductById);


export default router;