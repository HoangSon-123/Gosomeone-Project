//demo
const app = require('express');
const router = app.Router();
const { imageUpload }  = require('../config/imageUpload')
const siteC = require('../controllers/site.controller')

const tripSiteR = require('./tripSite.router')

router.get('/logging', (req, res) => {
    res.render('login');
});
router.post('/login', siteC.postLogin);

router.get('/signing', (req, res) => {
    res.render('signup');
});
router.post('/signup', siteC.formRegister);

router.get('/logout', siteC.postLogout);

router.get('/edit-profile', (req, res) => {
    res.render('editprofile', {
        user: req.cookies.user
    });
});


var epUpload = imageUpload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'ava', maxCount: 1 },
    { name: 'imgs', maxCount: 10 },
]);
router.post('/edit-profile', epUpload, siteC.postEditProfile);

router.get('/personal-info', (req, res) => {
    let user = req.cookies.user;
    user.dob = new Date(user.dob);
    res.render('personalinfo', {
        user: user
    });
});

router.post('/personal-info', siteC.editPersonalInfo);

// http://127.0.0.1:3000/site/trip/... => Go to trip site router
router.use('/trip', tripSiteR);

module.exports = router;