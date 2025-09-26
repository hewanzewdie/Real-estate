import { Request, Response } from 'express';
import { addProperty, getPropertiesBySeller, getPropertyById, editPropertyById, deletePropertyById} from '../services/PropertyService';
import { Property } from '../types/property';

export const getPropertiesBySellerController = async (req: Request, res: Response) => {
  try {
    const { sellerId } = req.query;
    if (!sellerId || typeof sellerId !== 'string') {
      return res.status(400).send('Error: sellerId query parameter is required.');
    }
    const properties = await getPropertiesBySeller(sellerId);
    res.json(properties);
  } catch (error) {
    res.status(500).send('Error: ' + (error as Error).message);
  }
};

export const addPropertyController = async (req: Request, res: Response) => {
  try {
    const { name, location, price, sellerId } = req.body;
    if (!name || !location || price === undefined || !sellerId) {
      return res.status(400).send('Error: name, location, price, and sellerId are required.');
    }
    const property: Property = {
      id: '', // will be set in service
      title: name,
      description: '',
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      location,
      createdAt: new Date(),
      forSale: true,
      forRent: false,
      salePrice: price,
      bedRooms: 0,
      bathRooms: 0,
      status: 'available',
      sellerId,
    };
    const id = await addProperty(property);
    res.status(201).json({ id, message: 'Property added successfully' });
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
    const updates: Partial<Property> = {};
    if (req.body.name !== undefined) updates.title = req.body.name;
    if (req.body.location !== undefined) updates.location = req.body.location;
    if (req.body.price !== undefined) updates.salePrice = req.body.price;
    await editPropertyById(req.params.id, updates);
    res.status(200).json({ message: 'Property updated successfully' });
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
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    if ((error as Error).message === 'Property not found.') {
      res.status(404).send('Error: Property not found.');
    } else {
      res.status(500).send('Error: ' + (error as Error).message);
    }
  }
};
