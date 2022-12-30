const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const mongoose = require("mongoose");



// Dùng file .env
dotenv.config({ path: __dirname + '/.env' });

// Connect Database
mongoose.set('strictQuery', false);
mongoose.connect((process.env.MONGODB_URL), () => {
    console.log("Đã kết nối đến MongoDB");
});

const authR=require('./routers/auth.r');
const homeR=require('./routers/home.r');

const app = express();
const port = 3000;
const localhost = '127.0.0.1';

//Set up session
require('./config/session')(app)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', handlebars.engine({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth',authR);

// app.get('/', (req, res) => {
//     console.log(req.session.username)
//     res.render('home', {
//         username: req.session.username
//     });
// });
app.use('/', homeR);

app.listen(port, () => {
    console.log(`Server running at http://${localhost}:${port}/`);
});