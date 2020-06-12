const express = require('express');
const router = express.Router();
const Blogpost = require('../models/blogpost');
const mongoose = require('mongoose');

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

router.get('/blog-posts/:id?/:date', (req, res) => {
	const date = req.params.date;
	Blogpost.find({createdOn: date})
		.exec()
		.then(blogPost => res.status(200).json(blogPost))
		.catch(err => res.status(500).json({
			message: `The blog post created on ${date} not found `,
			err: err
		}));
});

router.post('/blogpost', (req, res) => {
	console.log('req.body', req.body);
	const blogPost = new Blogpost(req.body);
	blogPost.save((err, blogPost) => {
		if(err) {
			return res.status(500).json(err);
		}
		res.status(201).json(blogPost);
	});
});

router.delete('/blog-posts/:id', (req, res) => {
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

module.exports = router;