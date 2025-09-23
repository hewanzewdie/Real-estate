import { Request, Response } from 'express';
import { addProperty, getProperties, getPropertyById, editPropertyById, deletePropertyById} from '../services/PropertyService';

export const getPropertiesController = async (req: Request, res: Response) => {
  try {
    const properties = await getProperties();
    res.json(properties);
  } catch (error) {
    res.status(500).send('Error: ' + (error as Error).message);
  }
};

export const addPropertyController = async (req: Request, res: Response) => {
  try {
    const id = await addProperty(req.body);
    res.status(201).send(`Property added with ID: ${id}`);
  } catch (error) {
    res.status(400).send('Error: ' + (error as Error).message);
  }
};

export const getPropertyByIdController = async (req: Request, res: Response) => {
  try {
    const property = await getPropertyById(req.params.id);
    res.json(property);
  } catch (error) {
    if ((error as Error).message === 'Property not found.') {
      res.status(404).send('Error: Property not found.');
    } else {
      res.status(400).send('Error: ' + (error as Error).message);
    }
  }
};

export const editPropertyByIdController = async (req: Request, res: Response) => {
  try {
    await editPropertyById(req.params.id, req.body);
    res.status(200).send(`Property with ID ${req.params.id} updated successfully`);
  } catch (error) {
    if ((error as Error).message === 'Property not found.') {
      res.status(404).send('Error: Property not found.');
    } else {
      res.status(400).send('Error: ' + (error as Error).message);
    }
  }
};

export const deletePropertyByIdController = async (req: Request, res: Response) => {
  try {
    await deletePropertyById(req.params.id);
    res.status(200).send(`Property with ID ${req.params.id} deleted successfully`);
  } catch (error) {
    if ((error as Error).message === 'Property not found.') {
      res.status(404).send('Error: Property not found.');
    } else {
      res.status(500).send('Error: ' + (error as Error).message);
    }
  }
};