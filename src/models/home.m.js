//demo
const db = require('./db');
const tripTable = "Trip";

module.exports = {
    load: async () => {
        const rs = await db.getAll(tripTable);
        return rs
    }
};