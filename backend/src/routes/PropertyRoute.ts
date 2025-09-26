import express from 'express';
import { getPropertiesBySellerController, addPropertyController, editPropertyByIdController, deletePropertyByIdController } from '../controllers/PropertyController';

const router = express.Router();

router.get('/properties', getPropertiesBySellerController);
router.post('/properties', addPropertyController);
router.put('/properties/:id', editPropertyByIdController);
router.delete('/properties/:id', deletePropertyByIdController);

export default router;