
const homeM = require('../models/home.m');
const userM = require('../models/auth.m');

exports.loadPage = async (req, res, next) => {
    try {
        const trips = await homeM.load();
        console.log(trips);
        for (let indexTrip = 0; indexTrip < trips.length; indexTrip++) {

            const date = new Date(trips[indexTrip].start_day)
            trips[indexTrip].day = date.getUTCDate();
            trips[indexTrip].month = date.getUTCMonth();
            trips[indexTrip].year = date.getUTCFullYear();

            trips[indexTrip].participants_user = [];
            for (let indexPar = 0; indexPar <  trips[indexTrip].participants_id.length; indexPar++) {
                const par = await userM.select("_id",  trips[indexTrip].participants_id[indexPar]);
                trips[indexTrip].participants_user.push(par);
            }

        }
        console.log(trips[0].participants_user);
        res.render('home', {
            username: req.session.username,
            trips: trips
        });

    } catch (error) {
        next(error);
    }
}

