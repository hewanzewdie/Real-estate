import express from 'express';
import { db } from './src/config/firebase';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { Property } from './src/types/property';

const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});

// Add property endpoint (POST)
app.post('/add-property', async (req, res) => {
  try {
    const newProperty: Property = {
      ...req.body,
      id: doc(collection(db, 'properties')).id, // Generate a unique ID
      createdAt: new Date()
    };

    const invalid = 
      (!newProperty.forSale && !newProperty.forRent) || // Must have at least one true
      (newProperty.forSale && newProperty.status === 'rented') || // Invalid sale status
      (newProperty.forRent && newProperty.status === 'sold'); // Invalid rent status

    if (invalid) {
      return res.status(400).send('Error: Invalid property configuration. For sale properties cannot have status "rented", and for rent properties cannot have status "sold". At least one of forSale or forRent must be true.');
    }

    await setDoc(doc(db, 'properties', newProperty.id), newProperty);
    res.status(201).send(`Property added with ID: ${newProperty.id}`);
  } catch (error) {
    res.status(500).send('Error: ' + (error as Error).message);
  }
});

// Properties endpoint (GET) to show list of properties
app.get('/properties', async (req, res) => {
  try {
    const propertiesSnapshot = await getDocs(collection(db, 'properties'));
    const properties: Property[] = propertiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));

    const invalidProperties = properties.filter(prop => 
      (!prop.forSale && !prop.forRent) || // Must have at least one true
      (prop.forSale && prop.status === 'rented') || // Invalid sale status
      (prop.forRent && prop.status === 'sold') // Invalid rent status
    );

    if (invalidProperties.length > 0) {
      return res.status(400).send('Error: Invalid property configuration in the list.');
    }

    res.json(properties);
  } catch (error) {
    res.status(500).send('Error: ' + (error as Error).message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));