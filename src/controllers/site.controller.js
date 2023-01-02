//demo
const siteM = require('../models/site.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

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

exports.postEditProfile = async (req, res, next) => {
    try {
        const userID = req.cookies.user._id;

        var newData = {
            profile: req.body
        }

        if (req.files.ava) {
            const ava = req.files.ava[0];
            const temppath = ava.path;
            const newpath = path.normalize(__dirname + `/../public/images/user/ava_${userID}.jpg`);
            console.log("Avatar sẽ được lưu tại " + newpath);

            // Lưu hình đại diện
            fs.rename(temppath, newpath, function (err) {
                if (err) next(err);
            });

            newData.profile.ava = `/images/user/ava_${userID}.jpg`
        } else if (req.cookies.user.profile.ava) {
            // Dùng lại hình cũ
            newData.profile.ava = req.cookies.user.profile.ava
        };

        if (req.files.coverImg) {
            const coverImg = req.files.coverImg[0];
            const temppath = coverImg.path;
            const newpath = path.normalize(__dirname + `/../public/images/user/coverImg_${userID}.jpg`);
            console.log("Ảnh bìa sẽ được lưu tại " + newpath);

            // Lưu hình bìa
            fs.rename(temppath, newpath, function (err) {
                if (err) next(err);
            });


            newData.profile.cover_img = `/images/user/coverImg_${userID}.jpg`
        } else if (req.cookies.user.profile.cover_img) {
            // Dùng lại hình cũ
            newData.profile.cover_img = req.cookies.user.profile.cover_img
        };

        if (req.files.imgs) {
            newData.profile.imgs = [];

            (req.files.imgs).forEach((img, index) => {
                const temppath = img.path;
                const newpath = path.normalize(__dirname + `/../public/images/user/img_${userID}_${index}.jpg`);
                console.log("Ảnh khác sẽ được lưu tại " + newpath);
    
                // Lưu hình khác
                fs.rename(temppath, newpath, function (err) {
                    if (err) next(err);
                });
    
                newData.profile.imgs.push(`images/user/img_${userID}_${index}.jpg`)
            });
        } else if (req.cookies.user.profile.imgs) {
            // Dùng lại hình cũ
            newData.profile.imgs = req.cookies.user.profile.imgs
        }

        console.log(newData)

        // Lưu link hình vào db
        await siteM.update("_id", userID, newData)

        // Sửa cookie
        const uDB = await siteM.select("_id", userID);
        uDB.username = undefined;
        uDB.password = undefined;
        console.log(uDB);
        res.cookie('user', uDB, {
            maxAge: 1000 * 60 * 60 * 24 * 10,
            httpOnly: true
        })

        res.redirect('/');
    } catch (error) {
        next(error);
    }
}