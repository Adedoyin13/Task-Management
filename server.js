require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const express = require("express");
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorMiddleware');
const taskRoute = require('./Route/taskRoute')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin")
    next()
})

app.use('/task', taskRoute)

app.get('/', (req, res) => console.log('Success'));

connectDB();
app.use(errorHandler);
mongoose.connection.once('open', () => {
    console.log('DataBase Connected!');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})
