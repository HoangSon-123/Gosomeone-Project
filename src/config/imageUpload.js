const fs = require('fs');
const path = require('path')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Xác định thư mục
        const userID = req.cookies.user._id;
        const dir = path.join(__dirname, `/../public/images/user/${userID}/`);

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
