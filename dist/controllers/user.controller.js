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
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const joi_1 = __importDefault(require("joi"));
const createUser = joi_1.default.object({
    userId: joi_1.default.number().required().messages({
        'any.required': 'User ID is required',
        'number.base': 'User ID must be a number',
    }),
    username: joi_1.default.string().required().messages({
        'any.required': 'Username is required',
        'string.base': 'Username must be a string',
    }),
    password: joi_1.default.string().required().messages({
        'any.required': 'Password is required',
        'string.base': 'Password must be a string',
    }),
    fullName: joi_1.default.object({
        firstName: joi_1.default.string()
            .required()
            .regex(/^[A-Z][a-zA-Z]*$/)
            .messages({
            'any.required': 'First name is required',
            'string.pattern.base': 'First name must start with an uppercase letter and contain only alphabetic characters',
        }),
        lastName: joi_1.default.string()
            .required()
            .regex(/^[A-Z][a-zA-Z]*$/)
            .messages({
            'any.required': 'Last name is required',
            'string.pattern.base': 'Last name must start with an uppercase letter and contain only alphabetic characters',
        }),
    })
        .required()
        .messages({
        'any.required': 'Full name is required',
    }),
    age: joi_1.default.number().required().messages({
        'any.required': 'Age is required',
        'number.base': 'Age must be a number',
    }),
    email: joi_1.default.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email is not in the correct format',
    }),
    isActive: joi_1.default.boolean().required().messages({
        'any.required': 'Active status is required',
        'boolean.base': 'Active status must be a boolean',
    }),
    hobbies: joi_1.default.array().items(joi_1.default.string()).min(1).required().messages({
        'any.required': 'At least one hobby is required',
        'array.min': 'At least one hobby is required',
    }),
    address: joi_1.default.object({
        street: joi_1.default.string().required().messages({
            'any.required': 'Street is required',
        }),
        city: joi_1.default.string().required().messages({
            'any.required': 'City is required',
        }),
        country: joi_1.default.string().required().messages({
            'any.required': 'Country is required',
        }),
    })
        .required()
        .messages({
        'any.required': 'Address details are required',
    }),
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
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const userId = req.params.userId;
        const userDataToUpdate = req.body;
        const updatedUser = yield user_service_1.userService.updateUser(userId, userDataToUpdate);
        if (!updatedUser) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }
        const serializedData = {
            userId: (_a = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.data) === null || _a === void 0 ? void 0 : _a.userId,
            username: (_b = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.data) === null || _b === void 0 ? void 0 : _b.username,
            fullName: (_c = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.data) === null || _c === void 0 ? void 0 : _c.fullName,
            age: (_d = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.data) === null || _d === void 0 ? void 0 : _d.age,
            email: (_e = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.data) === null || _e === void 0 ? void 0 : _e.email,
            isActive: (_f = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.data) === null || _f === void 0 ? void 0 : _f.isActive,
            hobbies: (_g = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.data) === null || _g === void 0 ? void 0 : _g.hobbies,
            address: (_h = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.data) === null || _h === void 0 ? void 0 : _h.address,
        };
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: serializedData,
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
