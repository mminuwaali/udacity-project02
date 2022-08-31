require('dotenv').config();
import Sequelize from './sequelize';
import models from './controllers/v0/model';
import Router from './controllers/v0/router';
import { deleteLocalFiles, filteredImageURL } from './util/util';
import express, { Response, Request, NextFunction as Next } from "express";

const app = express();
const port = process.env.port || 8080;

// app.set('view engine', 'ejs');
// app.set('views', join(__dirname, 'views'));
app.use((req: Request, res: Response, next: Next): void => {
  res.header("Access-Control-Allow-Origin", `http://localhost:${port}`);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(express.json());
app.use('/api/v0', Router);

const Server = async (): Promise<void> => {
  // database connection
  Sequelize.addModels(models);
  await Sequelize.sync();

  // server endpoints

  app.get('/', (req: Request, res: Response, next: Next): void => {
    res.render('pages');
  });

  app.listen(port, (): void => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Press CTRL + C to cancel the server');
  });
};

Server();
