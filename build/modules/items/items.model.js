"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = void 0;
const mongodb_1 = require("mongodb");
const ItemSchema = new mongodb_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    damage: { type: Number },
    durability: { type: Number },
    rarity: { type: String },
    stackable: { type: Boolean, default: true }
});
exports.ItemModel = (0, mongodb_1.model)("Item", ItemSchema);
