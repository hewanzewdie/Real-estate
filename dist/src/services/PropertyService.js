"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePropertyById = exports.editPropertyById = exports.getPropertyById = exports.addProperty = exports.getProperties = void 0;
const firebase_1 = require("../config/firebase");
const firestore_1 = require("firebase/firestore");
const getProperties = async () => {
    const snapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'properties'));
    const properties = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const invalidProperties = properties.filter((prop) => (!prop.forSale && !prop.forRent) ||
        (prop.forSale && (prop.status === 'rented' || prop.rentPrice !== undefined)) ||
        (prop.forRent && (prop.status === 'sold' || prop.salePrice !== undefined)) ||
        (prop.forSale && prop.leaseTerm !== undefined));
    if (invalidProperties.length > 0) {
        throw new Error('Invalid property configuration in the list.');
    }
    return properties;
};
exports.getProperties = getProperties;
const addProperty = async (property) => {
    const invalid = (!property.forSale && !property.forRent) ||
        (property.forSale && (property.status === 'rented' || property.rentPrice !== undefined)) ||
        (property.forRent && (property.status === 'sold' || property.salePrice !== undefined)) ||
        (property.forSale && property.leaseTerm !== undefined);
    if (invalid) {
        throw new Error('Invalid property configuration. For sale properties cannot have status "rented", a rentPrice or a leaseTerm, and for rent properties cannot have status "sold" and a salePrice. At least one of forSale or forRent must be true.');
    }
    const newProperty = {
        ...property,
        id: (0, firestore_1.doc)((0, firestore_1.collection)(firebase_1.db, 'properties')).id,
        createdAt: new Date(),
    };
    await (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, 'properties', newProperty.id), newProperty);
    return newProperty.id;
};
exports.addProperty = addProperty;
const getPropertyById = async (id) => {
    const docRef = (0, firestore_1.doc)(firebase_1.db, 'properties', id);
    const docSnap = await (0, firestore_1.getDoc)(docRef);
    if (!docSnap.exists()) {
        throw new Error('Property not found.');
    }
    const property = { id: docSnap.id, ...docSnap.data() };
    const invalid = (!property.forSale && !property.forRent) ||
        (property.forSale && (property.status === 'rented' || property.rentPrice !== undefined)) ||
        (property.forRent && (property.status === 'sold' || property.salePrice !== undefined)) ||
        (property.forSale && property.leaseTerm !== undefined);
    if (invalid) {
        throw new Error('Invalid property configuration.');
    }
    return property;
};
exports.getPropertyById = getPropertyById;
const editPropertyById = async (id, updates) => {
    const docRef = (0, firestore_1.doc)(firebase_1.db, 'properties', id);
    const docSnap = await (0, firestore_1.getDoc)(docRef);
    if (!docSnap.exists()) {
        throw new Error('Property not found.');
    }
    const property = { id: docSnap.id, ...docSnap.data() };
    const updatedProperty = { ...property, ...updates, updatedAt: new Date() };
    const invalid = (!updatedProperty.forSale && !updatedProperty.forRent) ||
        (updatedProperty.forSale && (updatedProperty.status === 'rented' || updatedProperty.rentPrice !== undefined)) ||
        (updatedProperty.forRent && (updatedProperty.status === 'sold' || updatedProperty.salePrice !== undefined)) ||
        (updatedProperty.forSale && updatedProperty.leaseTerm !== undefined);
    if (invalid) {
        throw new Error('Invalid property configuration. For sale properties cannot have status "rented", a rentPrice or a leaseTerm, and for rent properties cannot have status "sold" and a salePrice. At least one of forSale or forRent must be true.');
    }
    await (0, firestore_1.setDoc)(docRef, updatedProperty, { merge: true });
};
exports.editPropertyById = editPropertyById;
const deletePropertyById = async (id) => {
    const docRef = (0, firestore_1.doc)(firebase_1.db, 'properties', id);
    const docSnap = await (0, firestore_1.getDoc)(docRef);
    if (!docSnap.exists()) {
        throw new Error('Property not found.');
    }
    await (0, firestore_1.deleteDoc)(docRef);
};
exports.deletePropertyById = deletePropertyById;
