import express from 'express';
import { getPropertiesController, addPropertyController, getPropertyByIdController, editPropertyByIdController, deletePropertyByIdController } from '../controllers/PropertyController';

const propertyRouter = express.Router();

propertyRouter.get('/properties', getPropertiesController);
propertyRouter.post('/add-property', addPropertyController);
propertyRouter.get('/properties/:id', getPropertyByIdController);
propertyRouter.put('/properties/:id', editPropertyByIdController);
propertyRouter.delete('/properties/:id', deletePropertyByIdController);

export default propertyRouter;