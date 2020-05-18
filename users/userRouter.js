const express = require('express');

const router = express.Router();

const userDb = require('./userDb')
const postDb = require('../posts/postDb')


router.post('/', validateUser, (req, res) => {
  userDb.insert(req.body).then((user)=>{
    res.status(200).json({message: `Successfully added ${user.name}`})
  }).catch()
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  req.body.user_id = req.params.id
  postDb.insert(req.body).then(res.status(200).json({
    message: "You added a post"
  }))
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get()
  .then(users => {
    res.status(200).json(users)
  }).catch()
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb.getById(req.params.id).then(
  res.status(200).json(req.user)
).catch()
})

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb.getUserPosts(req.params.id).then((posts)=> {
    if (posts) {
      res.status(200).json({posts})
    } else {
      res.status(404).json({message: "There are no posts by this user"})
    }
    }).catch()
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.params.id).then(res.status(200).json({message: "You deleted the user!"})).catch()
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

// validateUserId validates the user id on every request that expects a user id parameter
// if the id parameter is valid, store that user object as req.user
// if the id parameter does not match any user id in the database, cancel the request and respond with status 400 
// and { message: "invalid user id" }
  function validateUserId(req, res, next) {
    userDb.getById(req.params.id).then(user=>{
      if (user){
        req.user = user
        next()
      } else {
        res.status(400).json({ message: 'invalid user id'})
      }
    }).catch()
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
  } else {
    next()
  }
}
function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data"})
  } else if (req.body.text.length < 1) {
    res.status(400).json({ message: "missing required text field"})
  } else {
    next()
  }
}



module.exports = router;
