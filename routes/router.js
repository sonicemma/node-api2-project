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
})

router.post('/', (req, res) => {

})

router.post('/:id/comments', (req, res) => {

})

router.put('/:id', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    
})


module.exports = router;