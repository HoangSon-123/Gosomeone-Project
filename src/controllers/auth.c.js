//demo
const userM = require('../models/auth.m')
const bcrypt = require('bcrypt');
const saltRounds = 10;

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