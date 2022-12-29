//demo
const userM = require('../models/auth.m')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.formRegister = async (req, res, next) => {
    try {
        const un = req.body.username
        const email = req.body.email
        const pw = req.body.password
        const pwHashed = await bcrypt.hash(pw, saltRounds);

        const uDBbyName = await userM.select("username", un);
        const uDBbyEmail = await userM.select("email", email);
        
        if(uDBbyEmail){
            return res.render('home',{
                failSignup: true,
                errorMessageSignup: 'Email đã được sử dụng'
            })
        }
        if(uDBbyName){
            return res.render('home',{
                failSignup: true,
                errorMessageSignup: 'Tên tài khoản đã tồn tại'
            })
        }

        const u = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            dob: req.body.dob,
            email: email,
            username: un,
            password: pwHashed
        }
        const uN = await userM.add(u)
        res.redirect('/')

    } catch (error) {
        next(error);
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const un = req.body.username
        const pw = req.body.password

        const uDBbyName = await userM.select("username", un);
        const uDBbyEmail = await userM.select("email", un)
        const uDB = uDBbyName || uDBbyEmail
        const pwDB = uDB.password
        const match = await bcrypt.compare(pw, pwDB);
        if (match) {
            //Session
            req.session.username = uDB.username

            return res.redirect('/')
        } else {
            return res.render('home', {
                failLogin: true,
                errorMessageLogin: "Tên tài khoản hoặc mật khẩu không chính xác"
            })
        }
    } catch (error) {
        next(error);
    }
}

// exports.postLogout = async (req, res, next) => {
//     try {
//         if (req.isAuthenticated()) {
//             req.logout(function (err) {
//                 if (err) {
//                     return next(err);
//                 }
//             });
//         }
//         return res.redirect('/account/login');
//     } catch (error) {
//         next(error);
//     }
// }