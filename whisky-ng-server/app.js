const express = require('express');
const app = express();
const api = require('./api/v1/index');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connection = mongoose.connection;
const port3000 = 3000;
const path = require('path');

app.set('port', (process.env.PORT || port3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const uploadsDir = path.join(__dirname, './uploads');
app.use(express.static(uploadsDir));

app.use('/api/v1', api);
app.use((req, res) => {
	const err = new Error('404 - Not found!');
	err.status = 400;
	res.json({msg: '404 - Not found!', err: err});
});

mongoose.connect('mongodb://localhost:27017/whiskyngserver', { useNewUrlParser: true, useUnifiedTopology: true });
connection.on('error', (err) => {
	console.error(`Connection to MongoDB error ${err.message}`);
});

connection.once('open', () => {
	console.log('Connect to MongoDB');
    
	app.listen(app.get('port'), () => {
		console.log(`The server listen to port ${app.get('port')}`);
	});
});