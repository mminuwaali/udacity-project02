require('dotenv').config();
import config from './config/config';
import { Sequelize } from 'sequelize-typescript';

const { dev: { username, password, database, host } } = config;


export default new Sequelize({ username, password, database, host, dialect: 'postgres', storage: ':memory:' });
