"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_controller_1 = require("./items.controller");
const router = (0, express_1.Router)();
router.get("/", items_controller_1.getItems);
router.post("/", items_controller_1.createNewItem);
exports.default = router;
