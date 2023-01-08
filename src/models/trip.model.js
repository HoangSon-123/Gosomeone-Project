const db = require('./db');
const tableName = "Trip";

module.exports = {
    allLean: async () => {
        const rs = await db.getAllLean(tableName);
        return rs
    },
    selectLean: async (fieldName,fieldValue) => {
        const rs = await db.getOneLean(tableName, fieldName, fieldValue);
        return rs;
    },
};