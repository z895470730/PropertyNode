const express = require('express');
const DB = require('../../mongo/server_device');
const router = express.Router();
const db = new DB();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(jsonParser);
router.use(urlencodedParser);

router.all('/balance', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Method', '*');
	const param = req.body;

	if (req.method === 'GET') {
		const whereStr  = req.query;
		db.find('balance', whereStr, (obj, err) => {
			if (err) {
				res.statusCode = 500;
				res.end();
			} else {
				res.send(obj[0]);
				res.end();
			}
		})
	}

		if (req.method === 'POST') {
			console.log(param)
			if(param.whereStr) {
				let updateStr = `{"${param.data.type}": "${param.data.value}"}`;
				updateStr = JSON.parse(updateStr);
				db.update('balance', {id: param.whereStr}, updateStr, (obj, err) => {
					if (err) {
						res.statusCode = 500;
						res.end();
					} else {
						res.send(obj);
						res.end();
					}
				})
			} else {
				res.statusCode = 500;
				res.end();
			}
		}

		if (req.method === 'OPTIONS') {
			res.send('');
		}
});

module.exports = router;
