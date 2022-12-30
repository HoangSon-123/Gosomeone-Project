//demo
const app=require('express');
const router=app.Router();
const userC=require('../controllers/auth.c')


router.post('/signup',userC.formRegister)
router.post('/login',userC.postLogin)



module.exports=router;