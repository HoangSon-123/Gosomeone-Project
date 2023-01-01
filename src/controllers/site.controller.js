//demo
const siteM = require('../models/site.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.formRegister = async (req, res, next) => {
    try {
        const un = req.body.username
        const email = req.body.email

        const uDBbyName = await siteM.select("username", un);
        const uDBbyEmail = await siteM.select("email", email);

        if (uDBbyEmail) {
            return res.render('signup', {
                errorMessage: 'Email đã được sử dụng'
            })
        }
        if (uDBbyName) {
            return res.render('signup', {
                errorMessage: 'Tên tài khoản đã tồn tại'
            })
        }
        const pw = req.body.password
        const pwHashed = await bcrypt.hash(pw, saltRounds);

        const u = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            dob: req.body.dob,
            email: email,
            username: un,
            password: pwHashed
        }

        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     port: 3000,
        //     secure: false, // true for 3000, false for other ports
        //     auth: {
        //         user: 'phuochainguyen2012@gmail.com', // generated ethereal user
        //         pass: "hai190102", // generated ethereal password
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     },
        // });
        // const code = Math.floor(Math.random() * 10000) + 1000;
        // console.log(code);
        // var mailOptions = {
        //     from: 'noreply@domain.com',
        //     to: email,
        //     subject: 'Confirm Email',
        //     text: 'Code: ' + code,
        // };
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);

        //         res.redirect('/site/verifyEmail')
        //     }
        // });

        const uN = await siteM.add(u)
        res.redirect('/')

    } catch (error) {
        next(error);
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        if (!req.cookies.token) {
            const un = req.body.username
            const pw = req.body.password

            const uDBbyName = await siteM.select("username", un);
            const uDBbyEmail = await siteM.select("email", un)
            const uDB = uDBbyName || uDBbyEmail
            if (!uDB) {
                return res.render('login', {
                    errorMessage: "Tên tài khoản hoặc mật khẩu không chính xác"
                })
            }
            const pwDB = uDB.password
            const match = await bcrypt.compare(pw, pwDB);
            if (match) {
                //Session
                // req.session.username = uDB.username
                const token = jwt.sign({ Username: un }, process.env.RTOKEN_SECRET, { expiresIn: '10d' });
                res.cookie('token', token, {
                    maxAge: 1000 * 60 * 60 * 24 * 10,
                    httpOnly: true
                })
                uDB.username = undefined;
                uDB.password = undefined;
                console.log(uDB);
                res.cookie('user', uDB, {
                    maxAge: 1000 * 60 * 60 * 24 * 10,
                    httpOnly: true
                })
                return res.redirect('/')
            } else {
                return res.render('login', {
                    errorMessage: "Tên tài khoản hoặc mật khẩu không chính xác"
                })
            }
        }
        else {
            res.redirect('/');
        }

    } catch (error) {
        next(error);
    }
}

exports.postLogout = (req, res, next) => {  
    console.log(req.cookies.user);
    res.clearCookie('token');
    res.clearCookie('user');
    res.redirect('/');
}