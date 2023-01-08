const app = require('express');
const router = app.Router();

const tripC = require('../controllers/trip.controller')

router.get('/', tripC.showAllTrips);

module.exports = router;