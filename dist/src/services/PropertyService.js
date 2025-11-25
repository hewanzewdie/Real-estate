"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePropertyById = exports.editPropertyById = exports.getPropertyById = exports.addProperty = exports.getProperties = void 0;
const firebase_1 = require("../config/firebase");
const firestore_1 = require("firebase/firestore");
const getProperties = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'properties'));
    const properties = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    const invalidProperties = properties.filter((prop) => (!prop.forSale && !prop.forRent) ||
        (prop.forSale && (prop.status === 'rented' || prop.rentPrice !== undefined)) ||
        (prop.forRent && (prop.status === 'sold' || prop.salePrice !== undefined)) ||
        (prop.forSale && prop.leaseTerm !== undefined));
    if (invalidProperties.length > 0) {
        throw new Error('Invalid property configuration in the list.');
    }
    return properties;
});
exports.getProperties = getProperties;
const addProperty = (property) => __awaiter(void 0, void 0, void 0, function* () {
    const invalid = (!property.forSale && !property.forRent) ||
        (property.forSale && (property.status === 'rented' || property.rentPrice !== undefined)) ||
        (property.forRent && (property.status === 'sold' || property.salePrice !== undefined)) ||
        (property.forSale && property.leaseTerm !== undefined);
    if (invalid) {
        throw new Error('Invalid property configuration. For sale properties cannot have status "rented", a rentPrice or a leaseTerm, and for rent properties cannot have status "sold" and a salePrice. At least one of forSale or forRent must be true.');
    }
    const newProperty = Object.assign(Object.assign({}, property), { id: (0, firestore_1.doc)((0, firestore_1.collection)(firebase_1.db, 'properties')).id, createdAt: new Date() });
    yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, 'properties', newProperty.id), newProperty);
    return newProperty.id;
});
exports.addProperty = addProperty;
const getPropertyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = (0, firestore_1.doc)(firebase_1.db, 'properties', id);
    const docSnap = yield (0, firestore_1.getDoc)(docRef);
    if (!docSnap.exists()) {
        throw new Error('Property not found.');
    }
    const property = Object.assign({ id: docSnap.id }, docSnap.data());
    const invalid = (!property.forSale && !property.forRent) ||
        (property.forSale && (property.status === 'rented' || property.rentPrice !== undefined)) ||
        (property.forRent && (property.status === 'sold' || property.salePrice !== undefined)) ||
        (property.forSale && property.leaseTerm !== undefined);
    if (invalid) {
        throw new Error('Invalid property configuration.');
    }
    return property;
});
exports.getPropertyById = getPropertyById;
const editPropertyById = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = (0, firestore_1.doc)(firebase_1.db, 'properties', id);
    const docSnap = yield (0, firestore_1.getDoc)(docRef);
    if (!docSnap.exists()) {
        throw new Error('Property not found.');
    }
    const property = Object.assign({ id: docSnap.id }, docSnap.data());
    const updatedProperty = Object.assign(Object.assign(Object.assign({}, property), updates), { updatedAt: new Date() });
    const invalid = (!updatedProperty.forSale && !updatedProperty.forRent) ||
        (updatedProperty.forSale && (updatedProperty.status === 'rented' || updatedProperty.rentPrice !== undefined)) ||
        (updatedProperty.forRent && (updatedProperty.status === 'sold' || updatedProperty.salePrice !== undefined)) ||
        (updatedProperty.forSale && updatedProperty.leaseTerm !== undefined);
    if (invalid) {
        throw new Error('Invalid property configuration. For sale properties cannot have status "rented", a rentPrice or a leaseTerm, and for rent properties cannot have status "sold" and a salePrice. At least one of forSale or forRent must be true.');
    }
    yield (0, firestore_1.setDoc)(docRef, updatedProperty, { merge: true });
});
exports.editPropertyById = editPropertyById;
const deletePropertyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = (0, firestore_1.doc)(firebase_1.db, 'properties', id);
    const docSnap = yield (0, firestore_1.getDoc)(docRef);
    if (!docSnap.exists()) {
        throw new Error('Property not found.');
    }
    yield (0, firestore_1.deleteDoc)(docRef);
});
exports.deletePropertyById = deletePropertyById;
