import express from 'express';
import { getPropertiesController, addPropertyController, getPropertyByIdController, editPropertyByIdController, deletePropertyByIdController } from '../controllers/PropertyController';

const router = express.Router();

router.get('/properties', getPropertiesController);
router.post('/add-property', addPropertyController);
router.get('/properties/:id', getPropertyByIdController);
router.put('/properties/:id', editPropertyByIdController);
router.delete('/properties/:id', deletePropertyByIdController);

export default router;