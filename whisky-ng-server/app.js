const express = require('express');
const app = express();
const api = require('./api/v1/index');
const cors = require('cors');
const port3000 = 3000;

app.set('port', (process.env.PORT || port3000));

app.use(cors());
app.use('/api/v1', api);

app.listen(app.get('port'), () => {
	console.log(`The server listen to port ${app.get('port')}`);
});