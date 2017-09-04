var express = require('express');

const router = express.Router();
router.get('/index.html',(req,res) => {
	req.sendFile(__dirname + '/web/index.html')
});
router.get('/login.html',(req,res) => {
	
});
router.get('/test.html',(req,res) => {
	res.sendFile('../web/test.html');
});
module.exports = router;