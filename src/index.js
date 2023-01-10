const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const hbs_helper = require("./helpers/hbs_helper")

// Dùng file .env
dotenv.config({ path: __dirname + '/.env' });

// Connect Database
mongoose.set('strictQuery', false);
mongoose.connect((process.env.MONGODB_URL), () => {
    console.log("Đã kết nối đến MongoDB");
});

const siteR=require('./routers/site.router');
const tripR=require('./routers/trip.router');


const app = express();
const port = 3000;
const localhost = '127.0.0.1';

//Set up session
require('./config/session')(app)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//cookie
app.use(cookieParser());

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: hbs_helper
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/site',siteR);
app.use('/trip',tripR)

app.get('/', (req, res) => {
    if (req.cookies.token) {
        res.render('home', {
            user: req.cookies.user
        });
    }else {
        res.render('home');
    }
   
});
app.use((req, res, next) => {
    next(new Error('Page not found'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode)
        .send(err.message);
});

app.listen(port, () => {
    console.log(`Server running at http://${localhost}:${port}/`);
});