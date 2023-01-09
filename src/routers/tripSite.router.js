const app = require('express');
const router = app.Router();
const { imageUpload }  = require('../config/imageUpload')
const tripC = require('../controllers/trip.controller')

router.get('/create',(req,res) => {
    if (req.cookies.token) {
        res.render('createtrip',{
            user: req.cookies.user,
        })
    }else {
        res.redirect('/site/logging')
    }
});
router.post('/createbasic', tripC.createBasicTrip)

var epUpload = imageUpload.fields([
    { name: 'img', maxCount: 10 },
    { name: 'stop_image', maxCount: 10 },
]);

router.post('/:tripID/createdetail', epUpload, tripC.createDetailTrip)

router.get('/:id', tripC.showATrip);
router.get('/', tripC.showAllTrips);

module.exports = router;