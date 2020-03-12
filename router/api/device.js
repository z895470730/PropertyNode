const express = require('express');
const router = express.Router();

router.get('/Maintain', (req, res) => {
	res.send('设备维护路由');
	res.end();
});

module.exports = router;


