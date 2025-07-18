import { z } from 'zod';

const loginWebSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string',
      })
      .nonempty({ message: 'email must contain some character(s)' })
      .email({ message: 'email is not valid' }),
    password: z
      .string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string',
      })
      .nonempty({ message: 'password must contain some character(s)' })
      .max(50, { message: 'password max 50 characters long' }),
  }),
});

const loginDeviceSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'username is required',
        invalid_type_error: 'username must be a string',
      })
      .nonempty({ message: 'username must contain some character(s)' }),
    password: z
      .string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string',
      })
      .nonempty({ message: 'password must contain some character(s)' })
      .max(50, { message: 'password max 50 characters long' }),
  }),
});

const verifyAccessCardWithPinSchema = z.object({
  body: z.object({
    uid: z
      .string({
        required_error: 'uid is required',
        invalid_type_error: 'uid must be a string',
      })
      .nonempty({ message: 'uid must contain some character(s)' }),
    pin: z
      .string({
        required_error: 'pin is required',
        invalid_type_error: 'pin must be a string',
      })
      .nonempty({ message: 'pin must contain some character(s)' })
      .max(6, { message: 'pin max 6 characters long' }),
  }),
});

export { loginWebSchema, loginDeviceSchema, verifyAccessCardWithPinSchema };
