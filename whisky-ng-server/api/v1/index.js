const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
	res.status(200).json({msg: 'Pong', date: new Date()});
});

module.exports = router;