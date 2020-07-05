const express = require('express');
const app = express();
const api = require('./api/v1/index');
const auth = require('./auth/routes/index');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connection = mongoose.connection;
const port3000 = 3000;
const path = require('path');

app.set('port', (process.env.PORT || port3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Use corse
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

// passport
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Strategy = require('passport-local').Strategy;
const User = require('./auth/models/user');

app.use(cookieParser());
app.use(session({
	secret: 'My top secret',
	resave: true,
	saveUninitialized: true,
	name: 'whisky-cookie'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((user, cb) => {
	cb(null, user);
});

passport.use(new Strategy({
	usernameField: 'username',
	passwordField: 'password'
}, (name, pwd, cb) => {
	// We need a User model
	User.findOne({ username: name }, (err, user) => {
		if (err) {
			console.error(`Could not find ${name} in MongoDB. Error: `, err);
			cb(null, false);
		}
		if (user.password != pwd) {
			console.log(`Wrong password for ${name}`);
			cb(null, false);
		} else {
			console.log(`${name} found in MongoDB and authenticated`);
			cb(null, user);
		}
	});

}));

const uploadsDir = path.join(__dirname, './uploads');
app.use(express.static(uploadsDir));

app.use('/api/v1', api);
app.use('/auth', auth);
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