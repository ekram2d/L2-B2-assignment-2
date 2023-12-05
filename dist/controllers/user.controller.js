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
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        // console.log('o', userData)
        const result = yield user_service_1.userService.creatUser(userData);
        console.log(result);
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error,
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
            error: error,
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
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user',
            error: error, // Change 'error' to 'error.message' to capture the error message
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userDataToUpdate = req.body;
        // Check if the user exists and update the data
        // console.log({ userId }, { userDataToUpdate })
        const updatedUser = yield user_service_1.userService.updateUser(userId, userDataToUpdate);
        if (!updatedUser) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }
        // console.log({ updateUser })
        res.status(200).json({
            success: true,
            message: 'User updated successfully!!!!!!!!',
            data: updateUser,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error: error,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // Find the user by ID and delete
        // console.log({ userId })
        const deletedUser = yield user_service_1.userService.deleteUser(userId);
        // Check if the user was found and deleted
        if (!deletedUser) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                data: null,
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
            error: error,
        });
    }
});
exports.userController = {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
