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
exports.userController = exports.getSingleUser = void 0;
const user_service_1 = require("../services/user.service");
// import { ObjectSchema } from 'joi'
const user_validation_1 = __importDefault(require("../validation/user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const { error, value } = user_validation_1.default.validate(userData);
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                error: error.details,
            });
        }
        const result = yield user_service_1.userService.creatUser(value);
        // Define the specific response structure when the user is created successfully
        const responseData = {
            success: true,
            message: 'User created successfully!',
            data: {
                userId: result.userId,
                username: result.username,
                fullName: {
                    firstName: result.fullName.firstName,
                    lastName: result.fullName.lastName,
                },
                age: result.age,
                email: result.email,
                isActive: result.isActive,
                hobbies: result.hobbies,
                address: result.address,
            },
        };
        return res.status(201).json(responseData);
    }
    catch (error) {
        // In case of an error, return a standard error response
        return res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.userService.getUser();
        //     console.log('ekram')
        const formattedUsers = users.map((user) => ({
            username: user.username,
            fullName: {
                firstName: user.fullName.firstName,
                lastName: user.fullName.lastName,
            },
            age: user.age,
            email: user.email,
            address: {
                street: user.address.street,
                city: user.address.city,
                country: user.address.country,
            },
        }));
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: formattedUsers,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield user_service_1.userService.singleUser(userId);
        if (!user) {
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
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: {
                userId: user === null || user === void 0 ? void 0 : user.userId,
                username: user === null || user === void 0 ? void 0 : user.username,
                fullName: user === null || user === void 0 ? void 0 : user.fullName,
                age: user === null || user === void 0 ? void 0 : user.age,
                email: user === null || user === void 0 ? void 0 : user.email,
                isActive: user === null || user === void 0 ? void 0 : user.isActive,
                hobbies: user === null || user === void 0 ? void 0 : user.hobbies,
                address: user === null || user === void 0 ? void 0 : user.address,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user',
            error: {
                code: 500,
                description: error.message || 'Internal Server Error',
            },
        });
    }
});
exports.getSingleUser = getSingleUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userDataToUpdate = req.body;
        const { success, data } = yield user_service_1.userService.updateUser(userId, userDataToUpdate);
        if (!success) {
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
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: {
                userId: data === null || data === void 0 ? void 0 : data.userId,
                username: data === null || data === void 0 ? void 0 : data.username,
                fullName: data === null || data === void 0 ? void 0 : data.fullName,
                age: data === null || data === void 0 ? void 0 : data.age,
                email: data === null || data === void 0 ? void 0 : data.email,
                isActive: data === null || data === void 0 ? void 0 : data.isActive,
                hobbies: data === null || data === void 0 ? void 0 : data.hobbies,
                address: data === null || data === void 0 ? void 0 : data.address,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error: {
                code: 500,
                description: (error === null || error === void 0 ? void 0 : error.message) || 'Internal Server Error',
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const deletedUser = yield user_service_1.userService.deleteUser(userId);
        if (!deletedUser) {
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
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: {
                code: 500,
                description: (error === null || error === void 0 ? void 0 : error.message) || 'Internal Server Error',
            },
        });
    }
});
exports.userController = {
    getUsers,
    createUser,
    getSingleUser: exports.getSingleUser,
    updateUser,
    deleteUser,
};
