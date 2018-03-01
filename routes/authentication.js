const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require ('../config/database');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/reg', (err, db) => {
      if (err) return console.log(err);

      closure(db);
  });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

module.exports = (router) => {

  router.post('/register', (req, res) => {
 
    if (!req.body.email) {
      res.json({ success: false, message: 'You must provide an e-mail' }); 
    } else {
   
      if (!req.body.username) {
        res.json({ success: false, message: 'You must provide a username' }); 
      } else {
        
        if (!req.body.password) {
          res.json({ success: false, message: 'You must provide a password' }); 
        } else {
         
          let user = new User({
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password
          });
          
          user.save((err) => {
            
            if (err) {
              
              if (err.code === 11000) {
                res.json({ success: false, message: 'Username or e-mail already exists' }); 
              } else {
                
                if (err.errors) {
                  
                  if (err.errors.email) {
                    res.json({ success: false, message: err.errors.email.message });
                  } else {
                    
                    if (err.errors.username) {
                      res.json({ success: false, message: err.errors.username.message }); 
                    } else {
                      
                      if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message }); 
                      } else {
                        res.json({ success: false, message: err }); 
                      }
                    }
                  }
                } else {
                  res.json({ success: false, message: 'Could not save user. Error: ', err }); 
                }
              }
            } else {
              res.json({ success: true, message: 'Acount registered!' }); 
            }
          });
        }
      }
    }
  });

  router.get('/checkEmail/:email', (req, res) =>{
    if(!req.params.email){
      res.json({
        success : false,
        message : 'Email was not provided'
      });
    } else{
      User.findOne({ email : req.params.email}, (err, user) => {
        if(err){
          res.json({
            success : false,
            message : err
          });
        } else{
          if(user){
            res.json({success : false, message : 'Email is already taken'
          });
          } else{
            res.json({
                success : false,
                message : 'Emai is available'
              });

          }
        }
      });
    }
  });


  router.get('/checkUsername/:username', (req, res) =>{
    if(!req.params.username){
      res.json({
        success : false,
        message : 'Username was not provided'
      });
    } else{
      User.findOne({ username : req.params.username}, (err, user) => {
        if(err){
          res.json({
            success : false,
            message : err
          });
        } else{
          if(user){
            res.json({success : false, message : 'Username is already taken'
          });
          } else{
            res.json({
                success : false,
                message : 'username is available'
              });

          }
        }
      });
    }
  });

  


  // Get users
router.get('/users', (req, res) => {
  connection((db) => {
      db.collection('users')
          .find()
          .toArray()
          .then((users) => {
              response.data = users;
              res.json(response);
          })
          .catch((err) => {
              sendError(err, res);
          });
  });
});

router.post('/login', (req, res) => {
 if(!req.body.username){
    res.json({
      success : false,
      message : 'No username was provided'
    });
  } else{
    if(!req.body.password){
      res.json({
        success : false,
        message : 'No passsword was provided'
      });
    } else{
      User.findOne({
        username : req.body.username.toLowerCase()},
      (err, user) => {
        if(err){
          res.json({success : false, message : err});
        } else{
          if(!user){
            res.json({success : false, message : 'Username not found'});
          } else{
            const validPassword = user.comparePassword(req.body.password);
            if(!validPassword){
              res.json({
                success : false,
                message : 'Password invalid'
              });
            } else{
             const token = jwt.sign({ userId : user._id}, config.secret, { expiresIn: '24h'});

              res.json({success : true, message : 'success', token : token, user: {username : user.username}});
            }
          }
        }
      });
    }
  }
});

  return router; // Return router object to main index.js
}