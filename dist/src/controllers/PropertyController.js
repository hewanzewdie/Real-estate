"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePropertyByIdController = exports.editPropertyByIdController = exports.getPropertyByIdController = exports.addPropertyController = exports.getPropertiesController = void 0;
const PropertyService_1 = require("../services/PropertyService");
const getPropertiesController = async (req, res) => {
    try {
        const properties = await (0, PropertyService_1.getProperties)();
        res.json(properties);
    }
    catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
};
exports.getPropertiesController = getPropertiesController;
const addPropertyController = async (req, res) => {
    try {
        const id = await (0, PropertyService_1.addProperty)(req.body);
        res.status(201).send(`Property added with ID: ${id}`);
    }
    catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
};
exports.addPropertyController = addPropertyController;
const getPropertyByIdController = async (req, res) => {
    try {
        const property = await (0, PropertyService_1.getPropertyById)(req.params.id);
        res.json(property);
    }
    catch (error) {
        if (error.message === 'Property not found.') {
            res.status(404).send('Error: Property not found.');
        }
        else {
            res.status(400).send('Error: ' + error.message);
        }
    }
};
exports.getPropertyByIdController = getPropertyByIdController;
const editPropertyByIdController = async (req, res) => {
    try {
        await (0, PropertyService_1.editPropertyById)(req.params.id, req.body);
        res.status(200).send(`Property with ID ${req.params.id} updated successfully`);
    }
    catch (error) {
        if (error.message === 'Property not found.') {
            res.status(404).send('Error: Property not found.');
        }
        else {
            res.status(400).send('Error: ' + error.message);
        }
    }
};
exports.editPropertyByIdController = editPropertyByIdController;
const deletePropertyByIdController = async (req, res) => {
    try {
        await (0, PropertyService_1.deletePropertyById)(req.params.id);
        res.status(200).send(`Property with ID ${req.params.id} deleted successfully`);
    }
    catch (error) {
        if (error.message === 'Property not found.') {
            res.status(404).send('Error: Property not found.');
        }
        else {
            res.status(500).send('Error: ' + error.message);
        }
    }
};
exports.deletePropertyByIdController = deletePropertyByIdController;
