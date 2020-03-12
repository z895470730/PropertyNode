const express = require('express');
const DB = require('../../mongo/server_device');
const router = express.Router();
const db = new DB();

router.all('/message', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Method', '*');
	if(req.method === 'GET') {
		db.find('message', {}, (obj, err) => {
			if(err) {
				res.statusCode = 500;
			} else {
				res.send(obj);
				res.end();
			}
		});
	}

	if(req.method === 'POST') {
		const msg = req.body;
		db.update('message', {name:msg.name}, {reply: msg.reply, replyMsg: msg.replyMsg}, (obj, err) => {
			res.send('');
			res.end();
		});

	}

	if(req.method === 'OPTIONS') {
		res.send('');
	}

});

module.exports = router;
