//demo
const app=require('express');
const router=app.Router();
const userC=require('../controllers/user.c')
const passport = require('passport');

router.post('/register/form',userC.formRegister)
router.get('/login',(req,res)=>{
    res.render('login')
})
// router.post('/',userC.postLogin)
router.post('/login',passport.authenticate('local',{ 
    successRedirect: '/homepage',
    failureRedirect: '/account/login', 
    failureMessage: true,
 }));

router.post('/register',userC.postRegister)
router.post('/logout',userC.postLogout)

module.exports=router;