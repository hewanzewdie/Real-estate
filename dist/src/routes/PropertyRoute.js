"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PropertyController_1 = require("../controllers/PropertyController");
const router = express_1.default.Router();
router.get('/properties', PropertyController_1.getPropertiesController);
router.post('/add-property', PropertyController_1.addPropertyController);
router.get('/properties/:id', PropertyController_1.getPropertyByIdController);
router.put('/properties/:id', PropertyController_1.editPropertyByIdController);
router.delete('/properties/:id', PropertyController_1.deletePropertyByIdController);
exports.default = router;
