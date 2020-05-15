const express = require('express');

const router = express.Router();

const userDb = require('./userDb')

const postDb = require('../posts/postDb')

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

// validateUserId validates the user id on every request that expects a user id parameter
// if the id parameter is valid, store that user object as req.user
// if the id parameter does not match any user id in the database, cancel the request and respond with status 400 
// and { message: "invalid user id" }
var validateUserId = function (req, res, next) {
  userDb.getById(req.params.id)
  .then(id => {
    if (id.length > 0) {
      id = req.user
      next()
    } else {
      res.status(404).json({ message: "invalid user id"})
    }
  })
  next()
}



// - `validateUser` validates the `body` on a 
// request to create a new user
// - if the request `body` is missing, 
// cancel the request and respond with 
// status `400` and 
// `{ message: "missing user data" }`
// - if the request `body` is missing 
// the required `name` field, 
// cancel the request and respond with 
// status `400` and 
// `{ message: "missing required name field" }`
function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data"})
  } else if (req.body.name.length < 1) {
    res.status(400).json({ message: "missing required name field"})
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
