const express = require('express');
const router = express.Router();
const Blogpost = require('../models/blogpost');
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const resize = require('../../utils/resize');

router.get('/ping', (req, res) => {
	res.status(200).json({msg: 'Pong', date: new Date()});
});

router.get('/blog-posts', (req, res) => {
	Blogpost.find()
		.sort({'createdOn': -1})
		.exec()  // Retourne une promesse et est utilisé car on n'a pas utilisé de callback dans find()
		.then(blogPost => {
			res.status(200).json(blogPost);
			console.log('connect with blogpost route');
		})
		.catch(err => {
			res.status(500).json({
				message: 'Blog post not found (',
				err: err
			});
		});	  
});

router.get('/blog-posts/:id', (req, res) => {
	const id = req.params.id;
	Blogpost.findById(id)
		.exec()
		.then(blogPost => res.status(200).json(blogPost))
		.catch(err => res.status(500).json({
			message: `Blog post with ${id} not found `,
			err: err 
		}));	  
});

// router.get('/blog-posts/:id?/:date', (req, res) => {
// 	const date = req.params.date;
// 	Blogpost.find({createdOn: date})
// 		.exec()
// 		.then(blogPost => res.status(200).json(blogPost))
// 		.catch(err => res.status(500).json({
// 			message: `The blog post created on ${date} not found `,
// 			err: err
// 		}));
// });

router.post('/blog-posts', (req, res) => {
	console.log('req.body', req.body);
	// const blogPost = new Blogpost(req.body);
	// const blogPost = new Blogpost({ ...req.body, image: lastUploadImageName });
	const smallImagePath = `./uploads/${lastUploadImageName}`;
	const outputName = `./uploads/small-${lastUploadImageName}`;
	resize({path: smallImagePath, width:200, height: 200, outputName: outputName})
		.then(data => {
			console.log('Ok resize ', data.size);
		})
		.catch(err => console.error('error for resize ', err));
	const blogPost = new Blogpost({
		...req.body,
		image: lastUploadImageName,
		smallImage: `small-${lastUploadImageName}`
	});
	
	blogPost.save((err, blogPost) => {
		if(err) {
			return res.status(500).json(err);
		}
		res.status(201).json(blogPost);
	});
});

router.delete('/blog-posts/:id', (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(401).json({ result: 'Ko', msg: 'Not authorized to delete a blog'});
	}
	const id = req.params.id;
	Blogpost.findByIdAndDelete(id, (err, blogPost) => {
		if(err)
			return res.status(500).json({
				message: `The blog post with id ${id} not found to delete. `,
				err: err
			});
		res.status(202).json({
			message: `The blog post with id ${blogPost._id} is deleted`,
		
		});
	});
});

router.delete('/blog-posts', (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(401).json({ result: 'Ko', msg: 'Not authorized to delete a blog'});
	}

	// url de la forme: http://localhost:3000/api/v1/blog-post?ids=1z3es,qa12ess	 
	const ids = req.query.ids;
	console.log('ids', ids);
	const allIds = ids.split(',').map(id => {
		if(id.match(/^[0-9a-fA-F]{24}$/)) {
			return mongoose.Types.ObjectId(id);
		} else {
			console.log('Id is not valid', id);
		}
	});
	const conditions = { _id: { $in: allIds}};
	Blogpost.deleteMany(conditions, (err, result) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(202).json(result); // result est sous la forme { nb: 2, ok: true }
	});
});


let lastUploadImageName = '';
// file upload configuration
const storages = multer.diskStorage({
	destination: './uploads/',
	filename: function(req, file, callback) {
		crypto.pseudoRandomBytes(16, function(err, raw){
			if(err) return callback(err);
			// callback(null, raw.toString('hex') + path.extname(file.originalname));
			lastUploadImageName = raw.toString('hex') + path.extname(file.originalname);
			console.log('lastUploadImageNsame', lastUploadImageName);
			callback(null, lastUploadImageName);

		});
	}
});

const upload = multer({storage: storages});	

// file upload route
router.post('/blog-posts/images', upload.single('blogImage'), (req, res) => {
	if(!req.file.filename.match(/\.(jpg|jpeg|png|PNG)$/)) {
		return res.status(400).json({msg: 'Not image file uploaded'});
	}
	res.status(201).send({filename: req.file.filename, file: req.file});
});


// router.get('/images/:image', (req, res) => {
// 	const image = req.params.image;
// 	res.sendFile(path.join(__dirname, `./uploads/${image}`));
// });


router.put('/blog-posts/:id', upload.single('blogImage'), (req, res) => {
	const id = req.params.id;
	const condition = { _id: id };
	const blogpost = { ...req.body, image: lastUploadImageName };
	const update = { $set: blogpost };
	const options = {
		upsert: true,
		new: true
	};
	Blogpost.findByIdAndUpdate(condition, update, options, (err, response) => {
		if(err) {
			res.status(500).json({msg: err});
		}
		res.status(200).json({msg: `The blog post with id ${id} updated.`, response: response});
	});

});

module.exports = router;