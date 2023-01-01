//demo
const userM = require('../models/auth.m')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getLoginForm = async (req, res, next) => {
    res.render('login', {
        user: req.session.user
    });
}

exports.getSignupForm = async (req, res, next) => {
    res.render('signup', {
        user: req.session.user
    });
}

exports.formRegister = async (req, res, next) => {
    try {
        const pw = req.body.password
        const pwHashed = await bcrypt.hash(pw, saltRounds);
        const u = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            dob: req.body.dob,
            email: req.body.email,
            username: req.body.username,
            password: pwHashed
        }
        const uN = await userM.add(u)
        res.redirect('/')

    } catch (error) {
        next(error);
    }
}

exports.formLogin = async (req, res, next) => {
    try {
        const un = req.body.username;
        const pw = req.body.password;

        const user = await userM.byName(un);
        if (!user) {
            return res.render('login', {
                user: req.session.user,
                error: "Không tìm thấy người dùng"
            });
        }

        const match = await bcrypt.compare(pw, user.password);

        if (!match) {
            return res.render('login', {
                user: req.session.user,
                error: "Sai mật khẩu"
            });
        }
        else {
            // Đăng nhập
            req.session.user = {
                name: user.username
            };
            res.redirect('/');
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