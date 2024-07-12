import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDB from './config/dbConnect.js';

import mainRouter from './routes/index.js'; 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(bodyParser.json()); // For parsing application/json


// Connect to database
connectDB();

// Define API routes
app.use('/api/v1', mainRouter);  

// Retrieve PORT from environment variables
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`.bgYellow);
});
