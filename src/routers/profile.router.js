//demo
const app = require('express');
const router = app.Router();
const { imageUpload }  = require('../config/imageUpload')
const siteC = require('../controllers/site.controller')

const tripSiteR = require('./tripSite.router')

router.get('/show/me', (req, res) => {
    res.render('profile', {
        user: req.cookies.user,
        userShowing: req.cookies.user
    });
});

module.exports = router;