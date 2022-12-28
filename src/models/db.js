require("../config/db/collections");
const mongoose = require("mongoose");
const schema="gosomeone";
mongoose.connect("mongodb+srv://admin:5ety153hEi3upthg@cluster0.78zqwia.mongodb.net/test");
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    DOB: Date,
    email: String,
    username: String,
    password: String
});


const add = async (tableName, entity) => {
    try {
        // Model = mongoose.model(tableName,schema);
        console.log(entity);
        Model = mongoose.model(tableName,userSchema);
        const object = new Model(entity);
        const result = await object.save();
        return result;
    } catch (err) {
        console.log(err);
    }
};

const getAll = async tableName => {
    try {
        Model = mongoose.model(tableName);
        const result = await Model.find();
        return result;
    } catch (err) {
        console.log(err);
    }
}

const getOne = async (tableName, fieldName, fieldValue) => {
    try {
        Model = mongoose.model(tableName);
        var filter = { [fieldName]: fieldValue};
        const result = await Model.findOne(filter);
        return result;
    } catch (err) {
        console.log(err);
    }
}

const updateOne = async (tableName, fieldName, fieldValue, newEntity) => {
    try {
        Model = mongoose.model(tableName);
        var filter = { [fieldName]: fieldValue};
        const result = await Model.findOneAndUpdate(filter, newEntity);
        return result;
    } catch (err) {
        console.log(err);
    }
};

const deleteOne = async (tableName, fieldName, fieldValue) => {
    try {
        Model = mongoose.model(tableName);
        var filter = { [fieldName]: fieldValue};
        const result = await Model.findOneAndDelete(filter);
        return result;
    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    add, getAll, getOne, updateOne, deleteOne
}