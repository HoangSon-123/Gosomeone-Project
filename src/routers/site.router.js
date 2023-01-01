//demo
const app=require('express');
const router=app.Router();
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

module.exports=router;