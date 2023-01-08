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
    ifIsZero: (value, options) => {
        if (value == 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    endDate: (startDate, duration) => {
        var result = new Date(startDate)
        result.setDate(result.getDate() + duration - 1)
        return result.toISOString();
    },
    endDate_short: (startDate, duration) => {
        // Calc end date
        var d = new Date(startDate)
        d.setDate(d.getDate() + duration - 1)
        d = d.toISOString();

        // Convert to dd-mmm-yy form
        const yy = d.substring(2, 4);

        const mm = d.substring(5, 7);
        const monthName = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const mmm = monthName[Number(mm)];

        const dd = d.substring(8, 10);

        return `${dd} ${mmm} ${yy}`
    }
}