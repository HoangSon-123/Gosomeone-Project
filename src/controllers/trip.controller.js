//demo
const tripM = require('../models/trip.model')

module.exports = {
    showAllTrips: async (req, res, error) => {
        // Load all trips from db
        var trips = await tripM.all();
        
        // Render to view
        res.render('alltrips', {
            user: req.cookies.user,
            trip: trips
        });
    }
}