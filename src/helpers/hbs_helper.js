module.exports = {
    isoDate: (dbDate) => {
        const string = dbDate.toISOString();
        return string.substring(0, 10);
    },
    shortDate: (dbDate) => {
        const yy = dbDate.getFullYear();

        const mm = dbDate.getMonth() + 1;
        const monthName = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const mmm = monthName[Number(mm)];

        const dd = dbDate.getDate();

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
        var result = startDate
        result.setDate(result.getDate() + duration - 1)
        return result.toISOString();
    },
    endDate_short: (startDate, duration) => {
        // Calc end date
        var d = startDate
        d.setDate(d.getDate() + duration - 1)

        // Convert to dd-mmm-yy form
        const yy = d.getFullYear();

        const mm = d.getMonth();
        const monthName = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const mmm = monthName[Number(mm)];

        const dd = d.getDate();

        return `${dd} ${mmm} ${yy}`
    }
}