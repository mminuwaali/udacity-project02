
require('dotenv').config;

export default {
  dev: {
    dialect: 'postgres',
    host: process.env.host,
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    aws_region: process.env.aws_region,
    aws_profile: process.env.aws_profile,
    aws_media_bucket: process.env.aws_media_bucket,
  },
  prod: {
    dialect: 'postgres',
    host: process.env.host,
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
  },
  jwt: { secret: process.env.secret },
};
