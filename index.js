import dotenv from 'dotenv';

dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import contactRoutes from './src/routes/contactRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import clientRoutes from './src/routes/clientRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import housingRoutes from './src/routes/housingRoutes.js';
import frontOfficeRoutes from './src/routes/frontOfficeRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import agentRoutes from './src/routes/agentRoutes.js';
import reportRoutes from './src/routes/reportRoutes.js';



const app = express();
const PORT = process.env.PORT || 3000;

  //body parser
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


//routes(app);
app.use('/contact', contactRoutes);
app.use('/auth', authRoutes);
app.use('/clients', clientRoutes);
app.use('/payments', paymentRoutes);
app.use('/housing', housingRoutes);
app.use('/frontoffice', frontOfficeRoutes);
app.use('/user', userRoutes);
app.use('/agent', agentRoutes);
app.use('/report', reportRoutes);

app.get('/', (req, res) =>
    res.status(200).json({ status: 'API running!' })
);


app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);