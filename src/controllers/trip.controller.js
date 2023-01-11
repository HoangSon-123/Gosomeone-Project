//demo
const tripM = require('../models/trip.model')
const siteM = require('../models/site.model');
const joinTripM = require('../models/joinTrip.model');


module.exports = {
    showAllTrips: async (req, res, next) => {
        // Load all trips from db
        var trips = await tripM.allLean();

        // Render to view
        res.render('alltrips', {
            user: req.cookies.user,
            trip: trips
        });
    },
    showATrip: async (req, res, next) => {
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

            // Data to render
            var renderData = {
                user: req.cookies.user,
                trip: trip,
                host: host,
                tripmate: tripmates
            }

            if (req.cookies.user) {
                const userID = req.cookies.user._id
                
                if (trip.host == userID) {
                    renderData.author = true;
                }
                else {
                    var joined = trip.tripmates.find(function (element) {
                        return element == userID;
                    });
                    
                    var confirming = await joinTripM.find({
                        user_id: userID, 
                        trip_id: req.params.id,
                        $or: [{ state: "confirming" }, { state: "requesting" }]
                    })

                    if (joined) {
                        renderData.joined = true;
                    } else if (confirming.length !== 0) {
                        renderData.confirming = true;
                    } else {
                        renderData.guest = true;
                    }
                }
            }
            else {
                renderData.guest = true;
            }


            // Render to view
            res.render('trip', renderData);


        }
        else {
            res.status(404);
        }

    },
    createBasicTrip: async (req, res, next) => {
        try {
            const leaderID = req.cookies.user._id;
            const tripTitle = req.body.title;
            const tripDate = req.body.dep_date;

            const trip = {
                title: tripTitle,
                dep_date: tripDate,
                host: leaderID
            }
            const addTrip = await tripM.add(trip);
            res.render('createtripdetail', {
                tripID: addTrip._id
            });
        } catch (error) {
            next(error);
        }
    },
    createDetailTrip: async (req, res, next) => {
        try {
            const location = req.body.location.split(',');
            const description = req.body.description.split(',');
            const total_days = req.body.total_days.split(',');

            var sum_total_days = 0;
            for (let index = 0; index < total_days.length; index++) {
                sum_total_days = sum_total_days + parseInt(total_days[index]);
            }

            var category = null;
            if (req.body.category.length === 1) {
                category = [req.body.category];
            } else {
                category = req.body.category;
            }

            var accommodation = null;
            if (req.body.accommodation.length === 1) {
                accommodation = [req.body.accommodation];
            } else {
                accommodation = req.body.accommodation;
            }



            var included = null;
            if (req.body.included.length === 1) {
                included = [req.body.included];
            } else {
                included = req.body.included;
            }

            const tripID = req.params.tripID;

            var imgs = [];
            for (let index = 0; index < req.files.img.length; index++) {
                imgs[index] = `/images/trip/${tripID}/${req.files.img[index].filename}`

            }

            var check_stop_img = false;
            if (req.files.stop_image !== undefined) {
                check_stop_img = true;
            }

            if (check_stop_img) {

                var stop_image = [];
                for (let index = 0; index < req.files.stop_image.length; index++) {
                    stop_image[index] = `/images/trip/${tripID}/${req.files.stop_image[index].filename}`

                }
            }

            var tripDB = {};
            tripDB.img = imgs;
            tripDB.type = req.body.type;
            tripDB.duration = sum_total_days;
            tripDB.location = "Vietnam";
            tripDB.price = parseInt(req.body.price);
            tripDB.category = category;
            tripDB.accommodation = accommodation;
            tripDB.trip_des = req.body.trip_des;
            tripDB.short_des = req.body.short_des;
            tripDB.total_tripmates = req.body.total_tripmates;
            tripDB.total_stop = req.body.total_days.length;

            tripDB.itinerary = [];
            for (let index = 0; index < total_days.length; index++) {
                if (check_stop_img) {
                    var a = {
                        no: index + 1,
                        img: stop_image[index],
                        location: location[index],
                        content: description[index],
                    }
                } else {
                    var a = {
                        no: index + 1,
                        location: location[index],
                        content: description[index],
                    }

                }
                tripDB.itinerary[index] = a;
            }

            tripDB.included = {
                accommodation: false,
                food: false,
                transportation: false,
                ticket: false,
            }
            for (let index = 0; index < included.length; index++) {
                const type = included[index];
                if (type === "accommodation") {
                    tripDB.included.accommodation = true;
                }
                if (type === "food") {
                    tripDB.included.food = true;
                }
                if (type === "transportation") {
                    tripDB.included.transportation = true;
                }
                if (type === "ticket") {
                    tripDB.included.ticket = true;
                }
            }
            await tripM.update("_id", tripID, tripDB)
            res.redirect('/')
        } catch (error) {
            next(error);
        }
    }

}