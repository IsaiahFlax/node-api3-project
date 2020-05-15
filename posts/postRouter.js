const express = require('express');

const router = express.Router();

const postDb = require('./postDb')

router.get('/', (req, res) => {
  // do your magic! get all the posts
  postDb.get(req.query)
  .then(posts=> {
    res.status(200).json(posts)
  })
})

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb.getById(req.params.id)
  .then(posts=> {
    res.status(200).json(posts)
  }).catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      error:"The posts could not be retrieved."
    })
  })
})

router.delete('/:id', validatePostId, (req, res) => {
  postDb.getById(req.params.id)
  .then(posts=> {
    res.status(200).json(posts)
  })
  postDb.remove(req.params.id)
.catch(error => {
  // log error to database
  console.log(error);
  res.status(500).json({
    error: "The post could not be removed" 
  })
})
})

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb.update(req.params.id, req.body)
  .then(update=> {
    res.status(200).json(update)
  }).catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The post info could not be modified" 
    })
  })
});

// custom middleware
// - `validatePost()`
//   - `validatePost` validates the `body` 
//   on a request to create a new post
//   - if the request `body` is missing, 
//   cancel the request and respond with status `400` and
//    `{ message: "missing post data" }`
//   - if the request `body` is missing 
//   the required `text` field, cancel the request and 
//   respond with status `400` and
//    `{ message: "missing required text field" }`
function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data"})
  } else if (req.body.text.length < 1) {
    res.status(400).json({ message: "missing required text field"})
  }
}
function validatePostId(req, res, next) {
  postDb.getById(req.params.id)
  .then(id => {
    if (id) {      
      id = req.post
      next()
    } else {
      res.status(404).json({ message:"invalid post id"})
    }
  })
}


module.exports = router;
