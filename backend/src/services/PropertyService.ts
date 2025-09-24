import { db } from '../config/firebase';
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { Property } from '../types/property';

export const getProperties = async (): Promise<Property[]> => {
  const snapshot = await getDocs(collection(db, 'properties'));
  const properties: Property[] = snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Property)
  );

  const invalidProperties = properties.filter((prop) =>
    (!prop.forSale && !prop.forRent) ||
    (prop.forSale && (prop.status === 'rented' || prop.rentPrice !== undefined)) ||
    (prop.forRent && (prop.status === 'sold' || prop.salePrice !== undefined)) ||
    (prop.forSale && prop.leaseTerm !== undefined)
  );

  if (invalidProperties.length > 0) {
    throw new Error('Invalid property configuration in the list.');
  }

  return properties;
};

export const addProperty = async (property: Property): Promise<string> => {
  const invalid =
    (!property.forSale && !property.forRent) ||
    (property.forSale && (property.status === 'rented' || property.rentPrice !== undefined)) ||
    (property.forRent && (property.status === 'sold' || property.salePrice !== undefined)) ||
    (property.forSale && property.leaseTerm !== undefined);

  if (invalid) {
    throw new Error(
      'Invalid property configuration. For sale properties cannot have status "rented", a rentPrice or a leaseTerm, and for rent properties cannot have status "sold" and a salePrice. At least one of forSale or forRent must be true.'
    );
  }

  const newProperty = {
    ...property,
    id: doc(collection(db, 'properties')).id,
    createdAt: new Date(),
  };
  await setDoc(doc(db, 'properties', newProperty.id), newProperty);
  return newProperty.id;
};

export const getPropertyById = async (id: string): Promise<Property> => {
  const docRef = doc(db, 'properties', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Property not found.');
  }

  const property = { id: docSnap.id, ...docSnap.data() } as Property;

  const invalid =
    (!property.forSale && !property.forRent) ||
    (property.forSale && (property.status === 'rented' || property.rentPrice !== undefined)) ||
    (property.forRent && (property.status === 'sold' || property.salePrice !== undefined)) ||
    (property.forSale && property.leaseTerm !== undefined);

  if (invalid) {
    throw new Error('Invalid property configuration.');
  }

  return property;
};

export const editPropertyById = async (id: string, updates: Partial<Property>): Promise<void> => {
  const docRef = doc(db, 'properties', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Property not found.');
  }

  const property = { id: docSnap.id, ...docSnap.data() } as Property;
  const updatedProperty = { ...property, ...updates, updatedAt: new Date() };

  const invalid =
    (!updatedProperty.forSale && !updatedProperty.forRent) ||
    (updatedProperty.forSale && (updatedProperty.status === 'rented' || updatedProperty.rentPrice !== undefined)) ||
    (updatedProperty.forRent && (updatedProperty.status === 'sold' || updatedProperty.salePrice !== undefined)) ||
    (updatedProperty.forSale && updatedProperty.leaseTerm !== undefined);

  if (invalid) {
    throw new Error(
      'Invalid property configuration. For sale properties cannot have status "rented", a rentPrice or a leaseTerm, and for rent properties cannot have status "sold" and a salePrice. At least one of forSale or forRent must be true.'
    );
  }

  await setDoc(docRef, updatedProperty, { merge: true });
};

export const deletePropertyById = async (id: string): Promise<void> => {
  const docRef = doc(db, 'properties', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Property not found.');
  }

  await deleteDoc(docRef);
};