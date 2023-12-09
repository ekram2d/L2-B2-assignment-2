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
const user_service_1 = require("../services/user.service");
const addToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { productName, price, quantity } = req.body;
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
const getSinleUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // Fetch orders for the specified user from the database
        const getsingle = yield user_service_1.userService.singleUser(userId);
        if (!getsingle) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
            return;
        }
        const orders = yield order_service_1.orderService.getOrder(userId);
        // Extract only the necessary fields from orders
        const userOrders = orders === null || orders === void 0 ? void 0 : orders.map((order) => ({
            productName: order.productName,
            price: order.price,
            quantity: order.quantity,
        }));
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: {
                orders: userOrders,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: error,
        });
    }
});
const getSinleUserOrdersSum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // Check if the user exists
        const getsingle = yield user_service_1.userService.singleUser(userId);
        if (!getsingle) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
            return;
        }
        const Orders = yield order_service_1.orderService.getOrderTotal(userId);
        // User found, retrieve orders
        const userOrders = Orders === null || Orders === void 0 ? void 0 : Orders.orders;
        // const userOrders = user.orders;
        const totalPrice = userOrders === null || userOrders === void 0 ? void 0 : userOrders.reduce((acc, order) => acc + order.price * order.quantity, 0);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice: totalPrice === null || totalPrice === void 0 ? void 0 : totalPrice.toFixed(2), // Convert to fixed decimal places if needed
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to calculate total price',
            error: {
                code: 500,
                description: error,
            },
        });
    }
});
exports.orderController = {
    addToOrder,
    getSinleUserOrders,
    getSinleUserOrdersSum,
};
