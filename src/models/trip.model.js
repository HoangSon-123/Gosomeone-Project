const db = require('./db');
const tableName = "Trip";

module.exports = {
    all: async () => {
        const rs = await db.getAll(tableName);
        return rs
    },
};