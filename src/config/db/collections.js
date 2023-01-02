const mongoose = require("mongoose");

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
        type: String
    },
    phone_number: {
        type: String
    },
    user_id: {
        type: String
    },
    ava: {
        type: String
    },
    coverImg: {
        type: String
    }
});

const assess = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    rating: {
        type: Number
    },
    review: {
        type: String
    }
});

const tripSchema = new mongoose.Schema({
    condition: {
        type: Number,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    start_day: {
        type: Date,
        required: true
    },
    end_day: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    organizer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    participants_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    price: {
        type: Number
    },
    description: [{
        type: String
    }],
    picture: {
        type: String,
        required: true
    },
    assess: [{
        type: assess
    }]

});

let User = mongoose.model("User", userSchema, "user");
let Trip = mongoose.model("Trip", tripSchema, "trip");

module.exports = { User, Trip };