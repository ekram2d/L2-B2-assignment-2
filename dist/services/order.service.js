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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const user_model_1 = __importDefault(require("../models/user.model")); // Assuming UserDocument is the user model document type
const addOrder = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_model_1.default.findOne({ userId: userId });
    // console.log(updatedUser)
    if (!updatedUser) {
        throw new Error('User not found');
    }
    if (!updatedUser.orders) {
        updatedUser.orders = [];
    }
    updatedUser.orders.push(orderData);
    yield updatedUser.save();
    return null;
});
const getOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const gettedUser = yield user_model_1.default.findOne({ userId: userId });
    if (!gettedUser) {
        throw new Error('User not found');
    }
    const order = gettedUser === null || gettedUser === void 0 ? void 0 : gettedUser.orders;
    return order || null;
});
const getOrderTotal = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const gettedUser = yield user_model_1.default.findOne({ userId: userId });
    // console.log(gettedUser?.orders)
    if (!gettedUser) {
        throw new Error('User not found');
    }
    return gettedUser;
});
exports.orderService = {
    addOrder,
    getOrder,
    getOrderTotal,
};
