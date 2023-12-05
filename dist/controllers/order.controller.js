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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("../services/order.service");
const addToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { productName, price, quantity } = req.body;
        // Check if the user exists
        // const userExists = await UserModel.findById(userId)
        // if (!userExists) {
        //   res.status(404).json({ success: false, message: 'User not found' })
        //   return
        // }
        const orderData = {
            productName,
            price,
            quantity,
        };
        // console.log({ userId }, { orderData })
        const updatedUser = yield order_service_1.orderService.addOrder(userId, orderData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: updatedUser, // Assuming orders is an array in the User model
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error,
        });
    }
});
exports.orderController = {
    addToOrder,
};
