const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/error');
const morgan = require('morgan');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to default page' });
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.use(errorHandler);
app.use('', (req, res) => {
  res
    .status(404)
    .json({ success: false, message: `${req.method} ${req.url} not found` });
});

app.listen(PORT, () => {
  connectDB();
  console.log('Listening for request on port', PORT);
});
