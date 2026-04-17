"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./api/v1/index"));
const error_middleware_1 = require("./middlewares/error.middleware");
const items_routes_1 = __importDefault(require("./modules/items/items.routes"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        message: "Servidor funcionando 🚀",
        api: "Minecraft Items API",
        endpoints: {
            getItems: "/items"
        }
    });
});
app.use("/items", items_routes_1.default);
app.use('/api/v1', index_1.default);
// Middleware de errores
app.use(error_middleware_1.errorMiddleware);
