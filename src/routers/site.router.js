//demo
const app=require('express');
const router=app.Router();
var multer = require('multer');
var upload = multer({ dest: __dirname + '/../public/images/temp/' });
const siteC=require('../controllers/site.controller')

router.get('/logging', (req, res) => {
    res.render('login');
});
router.post('/login',siteC.postLogin);

router.get('/signing', (req, res) => {
    res.render('signup');
});
router.post('/signup',siteC.formRegister);
    
router.get('/logout', siteC.postLogout);

router.get('/edit-profile', (req, res) => {
    res.render('editprofile');
});

var epUpload = upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'ava', maxCount: 1 },
  ]);
router.post('/edit-profile', epUpload, siteC.postEditProfile);

module.exports=router;