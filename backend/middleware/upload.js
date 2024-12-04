const multer = require('multer');


const myStorage = multer.diskStorage({
    destination:  './images',
    
    filename: (req, file, cb) => {
        let fname = Date.now() + '-' + file.mimetype.split('/')[1];
        cb(null, fname);
        filename = fname;
    }
});

const upload = multer({ storage: myStorage });

module.exports = upload; 