import { join } from 'path';

import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes';

dotenv.config(); // Set enviroment variables

const app = express();

// Variables
const { HOST, PORT } = process.env
app.set('host', HOST);
app.set('port', PORT);

app.set('viewsPath', join(__dirname, 'views'));

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }));

// Routes
app.use(routes);

app.use((req, res, next) => { // For page that does not exists
  res.status(404).sendFile(join(app.get('viewsPath'), '404.html'));
});

export default app;