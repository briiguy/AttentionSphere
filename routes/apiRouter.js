let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Subreddit = require('../db/schema.js').Subreddit

  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

    // Routes for a Model(resource) should have this structure

    apiRouter.post('/subreddits', function(request, response) {
    let subreddit = new Subreddit(request.body) //create new instance of schema from a MONGOOSE model, request.body is all the information that we have taken from the client side and we send it on the body of the request to the server
    subreddit.save(function(error) { //saves to db
        if(error) {
            response.send(error)
            
        }
        else {
            response.json(subreddit)
        }
    })
})

    apiRouter.get('/subreddits', function(request, response) {
        Subreddit.find(request.query, function(error, records){  //some methods live directly on the model, so you don't need to create a new instance.
        // request.query parses the parameters and turns them into an object (at this moment we have it just in case)
            if(error) {
                response.send(error)
            }
            else {
                response.json(records)
            }
      })
})


module.exports = apiRouter