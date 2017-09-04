var express = require('express')
var File = require('../controller/file/file')

const router = express.Router();

router.post('/upLoadFile',File.upLoadFile);
router.post('/upLoadIMG',File.upLoadIMG);
router.get('/delFile',File.delFile);
router.get('/getFile',File.getFile);
module.exports = router;