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
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const orderSchema = new mongoose_1.Schema({
    productName: { type: String, required: [true, 'Product name is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
});
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../app/config"));
// Create the User schema
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'User ID is required'],
        unique: true,
    },
    username: { type: String, required: [true, 'Username is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    fullName: {
        type: {
            firstName: {
                type: String,
                required: [true, 'First name is required'],
                validate: {
                    validator: function (value) {
                        const isValidFirstName = /^[A-Z][a-zA-Z]*$/.test(value);
                        return isValidFirstName;
                    },
                    message: '{VALUE} is not in the correct format or contains invalid characters',
                },
            },
            lastName: {
                type: String,
                required: [true, 'Last name is required'],
                validate: {
                    validator: function (value) {
                        const isValidFirstName = /^[A-Z][a-zA-Z]*$/.test(value);
                        return isValidFirstName;
                    },
                    message: '{VALUE} is not in the correct format or contains invalid characters',
                },
            },
        },
        required: [true, 'Full name is required'],
    },
    age: { type: Number, required: [true, 'Age is required'] },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: '{VALUE} is not correct email',
        },
    },
    isActive: { type: Boolean, required: [true, 'Active status is required'] },
    hobbies: {
        type: [
            {
                type: String,
            },
        ],
        validate: {
            validator: function (arr) {
                return arr && arr.length > 0;
            },
            message: 'At least one hobby is required.',
        },
    },
    address: {
        street: { type: String, required: [true, 'Street is required'] },
        city: { type: String, required: [true, 'City is required'] },
        country: { type: String, required: [true, 'Country is required'] },
    },
    orders: [orderSchema], // Embed the order schema within the User schema
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user === null || user === void 0 ? void 0 : user.password, Number(config_1.default.salt_round));
        // console.log(this, 'this will be save')
        next();
    });
});
userSchema.post('save', function () {
    // console.log('this is save')
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
