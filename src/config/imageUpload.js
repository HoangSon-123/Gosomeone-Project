const fs = require('fs');
const path = require('path')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Xác định thư mục
        console.log('imageUpload');
        const userID = req.cookies.user._id;
        var dir = path.join(__dirname, `/../public/images/user/${userID}/`);
        console.log('1');
        const tripID = req.params.tripID;
        if (tripID !== undefined) {
            console.log('tao thu muc trip/tripID');
            dir = path.join(__dirname, `/../public/images/trip/${tripID}/`);   
        }

        // Tạo thư mục nếu chưa có
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + file.originalname)
    }
})

module.exports = {
    imageUpload: multer({ storage: storage })
}
