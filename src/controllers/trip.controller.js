//demo
const tripM = require('../models/trip.model')
const siteM = require('../models/site.model')


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

        if (trip) {
            // Load host
            var host = await siteM.selectLean("_id", trip.host)

            // Load tripmates
            var tripmates = [];

            for (const tripmateID of trip.tripmates) {
                var tmp = await siteM.selectLean("_id", tripmateID);
                tripmates.push(tmp);
            }

            // Render to view
            res.render('trip', {
                user: req.cookies.user,
                trip: trip,
                host: host,
                tripmate: tripmates
            });
        }
        else {
            res.status(404);
        }

    }

}