//demo
const app=require('express');
const router=app.Router();
const homeC=require('../controllers/home.c')

router.get('/',homeC.loadPage)



module.exports=router;