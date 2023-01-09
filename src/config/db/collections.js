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
    profile:        profileSchema
});

const itinerarySchema = new mongoose.Schema({
    no:     Number,
    img:    String,
    content:String
});

const tripIncludeSchema = new mongoose.Schema({
    accommodation:  Boolean,
    ticket:         Boolean,
    transportation: Boolean
});

const tripSchema = new mongoose.Schema({
    title:          String,
    img:           [String],
    type:           String,
    dep_date:       Date,
    duration:       Number,
    location:       String,
    price:          Number,
    description:    String,
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    total_tripmates:Number,
    tripmates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    stop:           Number,
    itinerary:      [itinerarySchema],
    include:        tripIncludeSchema

});

let User = mongoose.model("User", userSchema, "user");
let Trip = mongoose.model("Trip", tripSchema, "trip");

module.exports = { User, Trip };