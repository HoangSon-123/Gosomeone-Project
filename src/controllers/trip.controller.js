//demo
const tripM = require('../models/trip.model')

module.exports = {
    showAllTrips: async (req, res, error) => {
        // Load all trips from db
        var trips = await tripM.allLean();
        
        // Render to view
        res.render('alltrips', {
            user: req.cookies.user,
            trip: trips
        });
    },
    showATrip: async (req, res, error) => {
        // Load a trip from db
        var trip = await tripM.selectLean("_id", req.params.id);

        
        // Render to view
        res.render('trip', {
            user: req.cookies.user,
            trip: trip
        });
    }

}