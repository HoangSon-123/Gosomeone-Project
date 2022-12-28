//demo
const db = require('./db');
const tableName="user";

module.exports = {
    all: async () => {
        const rs = await db.all(tableName);
        return rs
    },
    add: async u => {
        const rs = await db.add(tableName, u);
        return rs;
    },
    byName: async un =>{
        const rs=await db.select("*",tableName,"f_Username",un);
        return rs;
    }

};