const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//路由引入
const user = require('./router/api/user');
const device = require('./router/api/device');
const modifyUser = require('./router/api/modifyUser');
const house = require('./router/api/house');
const removeUser = require('./router/api/removeUserDetail');
const message = require('./router/api/message');
const balance = require('./router/api/balance');

app.use(jsonParser);
app.use(urlencodedParser);

//路由表
app.use('/api', modifyUser, user, house, removeUser, message, balance);

app.listen(8090);
