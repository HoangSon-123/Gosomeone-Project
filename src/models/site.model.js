//demo
const db = require('./db');
const tableName = "User";

module.exports = {
    // all: async () => {
    //     const rs = await db.all(tableName);
    //     return rs
    // },
    add: async u => {
        const rs = await db.add(tableName, u);
        return rs;
    },
    select: async (fieldName,fieldValue) => {
        const rs = await db.getOne(tableName, fieldName, fieldValue);
        return rs;
    }

};