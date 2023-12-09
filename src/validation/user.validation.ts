import Joi from 'joi'

const createUserValidation = Joi.object({
  userId: Joi.number().required().messages({
    'any.required': 'User ID is required',
    'number.base': 'User ID must be a number',
  }),
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
    'string.base': 'Username must be a string',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.base': 'Password must be a string',
  }),
  fullName: Joi.object({
    firstName: Joi.string()
      .required()
      .regex(/^[A-Z][a-zA-Z]*$/)
      .messages({
        'any.required': 'First name is required',
        'string.pattern.base':
          'First name must start with an uppercase letter and contain only alphabetic characters',
      }),
    lastName: Joi.string()
      .required()
      .regex(/^[A-Z][a-zA-Z]*$/)
      .messages({
        'any.required': 'Last name is required',
        'string.pattern.base':
          'Last name must start with an uppercase letter and contain only alphabetic characters',
      }),
  })
    .required()
    .messages({
      'any.required': 'Full name is required',
    }),
  age: Joi.number().required().messages({
    'any.required': 'Age is required',
    'number.base': 'Age must be a number',
  }),
  email: Joi.string()
    .email()
    .required() // Ensure uniqueness
    .messages({
      'any.required': 'Email is required',
      'string.email': 'Email is not in the correct format',
    }),
  isActive: Joi.boolean().required().messages({
    'any.required': 'Active status is required',
    'boolean.base': 'Active status must be a boolean',
  }),
  hobbies: Joi.array().items(Joi.string()).min(1).required().messages({
    'any.required': 'At least one hobby is required',
    'array.min': 'At least one hobby is required',
  }),
  address: Joi.object({
    street: Joi.string().required().messages({
      'any.required': 'Street is required',
    }),
    city: Joi.string().required().messages({
      'any.required': 'City is required',
    }),
    country: Joi.string().required().messages({
      'any.required': 'Country is required',
    }),
  })
    .required()
    .messages({
      'any.required': 'Address details are required',
    }),
})

export default createUserValidation
