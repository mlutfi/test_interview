import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoute from '../routes/product.route';
import moment from 'moment';
moment.locale('id');
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.static('public'));

// cors
const port = process.env.PORT || 3009;
app.use(cors());app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use('/', productRoute);

// ========================= HANDLE 404 ERROR =========================
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ code: 404, message: 'endpoint is not found', data: {} });
});

module.exports = app;
