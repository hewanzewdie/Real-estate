"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firebaseConfig = {
    apiKey: process.env.API_KEY || '',
    authDomain: process.env.AUTH_DOMAIN || '',
    projectId: process.env.PROJECT_ID || '',
    storageBucket: process.env.STORAGE_BUCKET || '',
    messagingSenderId: process.env.MESSAGING_SENDER_ID || '',
    appId: process.env.APP_ID || ''
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
