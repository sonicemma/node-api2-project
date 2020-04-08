const express = require('express');
const Posts = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`hello from router`);
})

router.get('/:id', (req, res) => {
    
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