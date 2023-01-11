const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
    phone:      Boolean,
    identity:   Boolean
});

const profileSchema = new mongoose.Schema({
    ava:        String,
    cover_img:  String,
    imgs:       [String],
    bio:        String,
    description:String,
    q1:         String,
    q2:         String,
    q3:         String,
    q4:         String
});

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number:   String,
    user_id:        String,
    verification:   verificationSchema,
    profile:        profileSchema,
    notification: [
        {
            _id: false,
            type: {
                type: String,
                enum: ['request', 'response']
            },
            trip_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Trip"
            },
            result: {
                type: String,
                enum: ['', 'accepted']
            },
        }
    ]
});



const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img:           [String],
    category: [String],
    accommodation: [String],
    type: {
        type: String,
        default: "guided"
    },
    dep_date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        default: 1
    },
    location:       String,
    price: {
        type: Number,
        default: 0
    },
    trip_des:    String,
    short_des:    String,
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    total_tripmates:Number,
    tripmates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    total_stop:           Number,
    itinerary:      [{
        _id: false,
        no:     Number,
        img:    String,
        content:String,
        location: String,
    }],
    included:        {
        accommodation:  Boolean,
        ticket:         Boolean,
        transportation: Boolean,
        food: Boolean,
    }

});

const joinTripSchema = new mongoose.Schema({
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    trip_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip"
    }],
    state: {
        type: String,
        enum: ['confirming', 'requesting', 'joined', 'finished']
    },
})

let User = mongoose.model("User", userSchema, "user");
let Trip = mongoose.model("Trip", tripSchema, "trip");
let joinTrip = mongoose.model("joinTrip", joinTripSchema, "joinTrip");

module.exports = { User, Trip, joinTrip };