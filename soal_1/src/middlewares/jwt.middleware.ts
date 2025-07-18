import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
} from '../helpers/secret-key.helper';
import { decryptText } from '../helpers/crypto.helper';

const generateRefreshToken = (payload: any) => {
  let expiresIn = process.env.JWT_REFRESH_EXPIRATION
    ? process.env.JWT_REFRESH_EXPIRATION
    : '7d';
  let signOptions = {
    issuer: 'Hardware Interface Solution',
    expiresIn: Number(expiresIn.replace('d', '')) * 24 * 60 * 60,
  };
  return jwt.sign(payload, JWT_REFRESH_SECRET_KEY, signOptions);
};

const authenticateRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let verifyOptions = {
    issuer: 'Hardware Interface Solution',
  };

  const refreshTokenHeader = req.headers['refresh_token'];

  if (refreshTokenHeader) {
    let refreshToken: string = refreshTokenHeader.toString();
    jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY, verifyOptions, (err) => {
      if (err) {
        return res.status(405).json({
          code: '405',
          message: 'invalid refresh token. please login again!',
          data: {},
        });
      }
      next();
    });
  } else {
    return res.status(401).json({
      code: '402',
      message: 'invalid request. authorization is required',
      data: {},
    });
  }
};

const generateAccessToken = (payload: any) => {
  let expiresIn: any = process.env.JWT_EXPIRATION
    ? process.env.JWT_EXPIRATION
    : '1d';

  let signOptions = {
    issuer: 'Hardware Interface Solution',
    expiresIn: expiresIn,
  };

  return jwt.sign(payload, JWT_SECRET_KEY, signOptions);
};

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        code: '403',
        message: 'invalid request. token is required',
        data: {},
      });
    }

    let verifyOptions = {
      issuer: 'Hardware Interface Solution',
    };

    await jwt.verify(token, JWT_SECRET_KEY, verifyOptions, (err, data: any) => {
      if (err) {
        return res.status(405).json({
          code: '405',
          message: 'invalid token',
          data: {},
        });
      }

      req.user_id_token = parseInt(decryptText(data.user_id));
      req.name_token = data.name;
      next();
    });
  } else {
    return res.status(401).json({
      code: '402',
      message: 'invalid request. authorization is required',
      data: req.headers,
    });
  }
};

export {
  generateRefreshToken,
  authenticateRefreshToken,
  generateAccessToken,
  authenticateToken,
};