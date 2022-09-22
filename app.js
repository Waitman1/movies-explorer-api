require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorsHandler = require('./middleware/errorsHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.DB_CONN : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
