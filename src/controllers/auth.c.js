//demo
const userM = require('../models/user.m')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.postRegister = async (req, res, next) => {
    try {
        res.render('register')
    } catch (error) {
        next(error);
    }
}

exports.formRegister = async (req, res, next) => {
    try {
        const pw = req.body.password
        const pwHashed = await bcrypt.hash(pw, saltRounds);
        const u = {
            f_Username: req.body.username,
            f_Password: pwHashed,
            f_Name: req.body.name,
            f_Email: req.body.email,
            f_DOB: req.body.DOB,
            f_Permission: 0
        }
        const uN = await userM.add(u)
        res.redirect('/')

    } catch (error) {
        next(error);
    }
}

exports.postLogout = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
            });
        }
        return res.redirect('/account/login');
    } catch (error) {
        next(error);
    }
}