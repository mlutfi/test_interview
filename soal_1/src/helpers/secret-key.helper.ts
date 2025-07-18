import { Secret } from 'jsonwebtoken';

const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY
  ? process.env.JWT_SECRET_KEY?.toString()
  : 'Hardware Interface Solution';

const JWT_REFRESH_SECRET_KEY: Secret = process.env.JWT_REFRESH_SECRET_KEY
  ? process.env.JWT_REFRESH_SECRET_KEY?.toString()
  : 'Hardware Interface Solution';

const GLOBAL_SECRET_KEY = process.env.GLOBAL_SECRET_KEY
  ? process.env.GLOBAL_SECRET_KEY?.toString()
  : 'Hardware Interface Solution';

export { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY, GLOBAL_SECRET_KEY };
