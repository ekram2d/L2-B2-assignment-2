"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createUserValidation = joi_1.default.object({
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
    email: joi_1.default.string()
        .email()
        .required() // Ensure uniqueness
        .messages({
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
exports.default = createUserValidation;
