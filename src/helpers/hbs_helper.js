module.exports = {
    dob_short: (user) => {
        return user.dob.substring (0, 10);
    }
}