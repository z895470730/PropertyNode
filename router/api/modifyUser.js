const express = require('express');
const bodyParser = require('body-parser');
const DB = require('../../mongo/server_device');
const router = express.Router();
const db = new DB();

var jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(jsonParser);
router.use(urlencodedParser);
router.all('/modifyUser',(req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	if(req.method !== 'OPTIONS') {
		let {whereStr, dataStr} = req.body;
		whereStr = {id: whereStr};
		console.log(whereStr, dataStr);
		db.update('user', whereStr, dataStr, (result, err) => {
			if(err) {
				console.log(err)
			} else {
				res.send(result);
				res.end();
			}
		});
	} else {
		res.send('')
	}
});

module.exports = router;
