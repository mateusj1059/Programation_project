"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
const _AuthController = new auth_controller_1.AuthController();
router.post('/register', _AuthController.register);
router.get('/login', _AuthController.login);
exports.default = router;
