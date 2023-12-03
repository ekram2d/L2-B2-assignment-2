"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
exports.router = express_1.default.Router();
exports.router.post('/users', user_controller_1.userController.createUser);
exports.router.get('/users', user_controller_1.userController.getUsers);
// router.get('/users/:userId', userController.getUserById)
// router.put('/users/:userId', userController.updateUserById)
// router.delete('/users/:userId', userController.deleteUserById)
exports.userRoutes = exports.router;
