const express = require("express");
const router = require('./routes/router');
const server = express();

server.use(express.json());

server.use('/api/posts', router); 

server.get('/', (req, res) => {
    res.send(`Hello!`);
});

server.listen(4000, () => {
    console.log("\n*** Server Running on http://localhost:4000 ***\n");
  });