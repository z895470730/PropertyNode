const express = require('express');
const DB = require('../../mongo/server_device');
const router = express.Router();
const db = new DB();

router.get('/user', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	db.find('user', {}, (result, err) => {
		if(err) {
			console.log(err)
		} else {
			res.send(result);
			res.end();
		}
	});
});

module.exports = router;
