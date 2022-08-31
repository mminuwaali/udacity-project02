require('dotenv').config();
import config from '../config/config';
import { verify, sign } from 'jsonwebtoken';
import User from '../controllers/v0/user/model';
import { compare, hash, genSalt } from 'bcrypt';
import { Request, Response, NextFunction as Next } from 'express';

const rounds = 10;

export const generatePassword = async (plainTextPassword: string): Promise<string> => {
  const salt = await genSalt(rounds);
  const hashed = await hash(plainTextPassword, salt);
  return hashed;
}

export const comparePaswords = async (plainTextPassword: string, hash: string): Promise<boolean> => await compare(plainTextPassword, hash);

export const generateJWT = (user: User): string => sign(user.toJSON(), config.jwt.secret);

export const requireAuth = async (req: Request, res: Response, next: Next): Promise<any> => {
  if (!req.headers || !req.headers.authorization) return res.status(401).send({ message: 'No authorization headers provided' });

  const token_bearer = req.headers.authorization.split(' ');
  if (token_bearer.length !== 2) return res.status(401).send({ message: 'Malformed token!' });

  const token = token_bearer[1];
  return verify(token, config.jwt.secret, (err, decodeURI) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate' });
    return next();
  })
};
