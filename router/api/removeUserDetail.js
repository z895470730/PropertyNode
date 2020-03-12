const express = require('express');
const router = express.Router();
const DB = require('../../mongo/server_device');
const db = new DB();

router.all('/removeUser', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	if(req.method !== 'OPTIONS') {
		const whereStr = req.body.whereStr;
		db.delete('user', {id: whereStr}, (obj, err) => {
			if(err) {
				console.log(err);
				res.setEncoding(500);
			} else {
				res.send(obj);
				res.end();
			}
		});
	} else {
		res.send('');
	}
});

module.exports = router;
