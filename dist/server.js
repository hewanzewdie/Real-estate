"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PropertyRoute_1 = __importDefault(require("./src/routes/PropertyRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://real-estate-2-dun.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Backend is up and running!');
});
app.use(PropertyRoute_1.default);
if (process.env.NODE_ENV !== "production") {
    app.listen(3000, () => console.log("Local server running on port 3000"));
}
exports.default = app;
