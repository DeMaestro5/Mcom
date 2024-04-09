import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose from 'mongoose';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';
import { registerRoutes } from './routes/register.js';
import { loginRoutes } from './routes/login.js';

import cookieParser from 'cookie-parser';

// data imports

import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStats.js';
import Transaction from './models/Transaction.js';
import AffiliateStat from './models/AffiliateStat.js';
import {
  dataProduct,
  dataProductStat,
  dataUser,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from './data/index.js';
import OverallStat from './models/OverallStats.js';
import { verifyToken } from './middlewares/verifyToken.js';

// configurations

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST'],
  })
);
app.use(cookieParser());

// routes

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

app.use('/auth', verifyToken, async (req, res) => {
  const existingUser = await User.findById(req.userId);
  return res.json({ status: true, user: existingUser });
});

// mongo setup

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    //  add data Once
    //   AffiliateStat.insertMany(dataAffiliateStat);
    //   OverallStat.insertMany(dataOverallStat);
    //   Product.insertMany(dataProduct);
    //   ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
    //   Transaction.insertMany(dataTransaction);
  })
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.connection.dropCollection('ProductStat').then(() => {
//   console.log('database dropped');
// });
