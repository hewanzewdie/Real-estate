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
exports.deletePropertyByIdController = exports.editPropertyByIdController = exports.getPropertyByIdController = exports.addPropertyController = exports.getPropertiesController = void 0;
const PropertyService_1 = require("../services/PropertyService");
const getPropertiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield (0, PropertyService_1.getProperties)();
        res.json(properties);
    }
    catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});
exports.getPropertiesController = getPropertiesController;
const addPropertyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield (0, PropertyService_1.addProperty)(req.body);
        res.status(201).send(`Property added with ID: ${id}`);
    }
    catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
});
exports.addPropertyController = addPropertyController;
const getPropertyByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield (0, PropertyService_1.getPropertyById)(req.params.id);
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
});
exports.getPropertyByIdController = getPropertyByIdController;
const editPropertyByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, PropertyService_1.editPropertyById)(req.params.id, req.body);
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
});
exports.editPropertyByIdController = editPropertyByIdController;
const deletePropertyByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, PropertyService_1.deletePropertyById)(req.params.id);
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
});
exports.deletePropertyByIdController = deletePropertyByIdController;
