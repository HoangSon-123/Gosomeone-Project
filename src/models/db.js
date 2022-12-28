require("../config/db/collections");
const mongoose = require("mongoose");


const add = async (tableName, entity) => {
    try {
        Model = mongoose.model(tableName);
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