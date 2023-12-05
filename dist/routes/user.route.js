"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const order_controller_1 = require("../controllers/order.controller");
exports.router = express_1.default.Router();
exports.router.post('/users', user_controller_1.userController.createUser);
exports.router.get('/users', user_controller_1.userController.getUsers);
exports.router.get('/users/:userId', user_controller_1.userController.getSingleUser);
exports.router.patch('/users/:userId', user_controller_1.userController.updateUser);
exports.router.delete('/users/:userId', user_controller_1.userController.deleteUser);
exports.router.post('/users/:userId/orders', order_controller_1.orderController.addToOrder);
exports.userRoutes = exports.router;
