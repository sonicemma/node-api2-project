const express = require('express');
const Posts = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then((posts) => {
        res.status(200).json({queryString: req.query, posts})
    })
    .catch((error) => {
        console.log(error.message, error);
        res.status(500).json({
            message: 'Error retrieving posts',
        });
    });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then((post) => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found'})
        }
        }
    )
    .catch((err) => {
        console.log(err.message, err);
        res.status(500).json({message: 'Error retrieving post'})
    })
})

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then((comments) => {
        if (comments) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({message: 'Comments not found'})
        }
    })
    .catch(error =>{
        console.log(err.message, err);
        res.status(500).json({message: 'Error retrieving comments'})
    })
})

router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then((post) => {
        if (!post.title || !post.contents) {
            res.status(400).json({message: 'Add title and content for post'})
        } else {
            res.status(201).json(post);
        }
    })
    .catch((error) => {
        console.log(error.message, error);
        res.status(500).json({message: 'Error adding post'})
    })
})

router.post('/:id/comments', (req, res) => {
    if(!req.body.text) {
        res.status(400).json({message: 'No comment text'})
    } else {
        Posts.findById(req.params.id)
        .then(post => {
            if (post.length) {
                Posts.insertComment(req.body, req.params.id)
                res.status(201).json(comment)
            } else {
                res.status(404).json({message: 'Post not found'})
            }
        })
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({message: 'Missing title / content'})
    } else {
        Posts.findById(id)
        .then(post => {
            if (post.length) {
                try {
                    Posts.update(id, update)
                    .then(count => {
                        if(count > 0) {
                            res.status(200).json(update)
                        }
                    })
                } 
                catch(error) {
                    console.log(error.message, err)
                    res.status(500).json({message: 'Post failed to remove'})
                }
            } else {
                res.status(404).json({message: 'Post not found'})
            }
        }
    )}
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Posts.findById(id)
    .then(post => {
        if (post.length) {
            try {
                Posts.remove(id)
                .then(nil => {
                    res.status(200).json(post)
                })
            }
            catch(error) {
                res.status(500).json({message: 'Post failed to remove'})
            }
        } else {
            res.status(400).json({message: 'Post not found'})
        }
    })
})


module.exports = router;