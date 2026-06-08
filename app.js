const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { testConnection } = require('./config/database');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

testConnection();

app.use('/api', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Что-то пошло не так!' });
});

module.exports = app;
