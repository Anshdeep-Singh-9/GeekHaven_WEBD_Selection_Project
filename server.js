import dotenv, { populate } from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const user=require('./routes/userRoutes.js');
import user from './routes/userRoutes.js';
import Database from './routes/databaseRoutes.js';
// app.use('/api/users', user);
app.use('/api/Database', Database);
app.use('/api/v1/auth', user);
app.use('/api/v1/user', user);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});



