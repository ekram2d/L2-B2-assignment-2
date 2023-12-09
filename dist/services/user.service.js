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
exports.userService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const creatUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(userData);
    return result;
});
// const creatUser = async (userData: User) => await UserModel.create(userData)
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
const singleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ userId: userId });
        if (user) {
            return user;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return null;
    }
});
const updateUser = (userId, updatedValue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_model_1.default.findOneAndUpdate({ userId: userId }, // Assuming the field to search for is userId
        updatedValue, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return {
                success: false,
                message: 'User not found or no changes applied',
            };
        }
        return {
            success: true,
            message: 'User updated successfully!',
            data: updatedUser,
        };
    }
    catch (error) {
        return {
            success: false,
            message: 'Failed to update user. Please try again later.',
        };
    }
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const validUserId = new mongoose.Types.ObjectId(userId) // Use mongoose.Types.ObjectId
    // console.log({ validUserId })
    yield user_model_1.default.findOneAndDelete({ userId });
    return null; // Return the deleted user or null if not found
});
exports.userService = {
    creatUser,
    getUser,
    singleUser,
    updateUser,
    deleteUser,
};
