module.exports = {
    isoDate: (dbDate) => {
        return dbDate.substring(0, 10);
    },
    shortDate: (dbDate) => {
        const yy = dbDate.substring(2, 4);

        const mm = dbDate.substring(5, 7);
        const monthName = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const mmm = monthName[Number(mm)];

        const dd = dbDate.substring(8, 10);

        return `${dd} ${mmm} ${yy}`
    },
}