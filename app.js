const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const orderRoutes = require('./src/routers/orderRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/view'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/orders');
});

app.use('/orders', orderRoutes);

app.use((err, req, res, next) => {
  res.status(500).send(err.message || 'Internal Server Error');
});

module.exports = app;