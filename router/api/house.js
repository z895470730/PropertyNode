const express = require('express');
const DB = require('../../mongo/server_device');
const router = express.Router();
const db = new DB();

router.get('/house', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	db.relevance(
		'house',
		'user',
		'id',
		'id',
		'userDetail',
		(obj) => {
			res.send(obj);
			res.end();
		}
	);
});

module.exports = router;
