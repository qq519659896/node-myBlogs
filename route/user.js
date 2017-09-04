var express = require('express')
var User = require('../controller/user/user')

const router = express.Router();

router.post('/addUser',User.addUser);
router.post('/updateUser',User.updateUser);
router.get('/infoUser',User.infoUser);
router.get('/delUser',User.delUser);
module.exports = router;