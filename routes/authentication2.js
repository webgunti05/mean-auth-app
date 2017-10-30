const Feed = require('../models/feed');
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

 

  //feeds router
router.post('/feeds', (req, res) => {
  if(!req.body.avatar){
    res.json({ success : false, message : 'You must provide image'});
  } else{
    if(!req.body.name){
      res.json({ success : false, message : 'You must provide name'});
    } else {
      if(!req.body.message){
        res.json({ success : false, message : 'You must provide description'});
      } else{

        let feed = new Feed({
          avatar : req.body.avatar.toLowerCase(),
          name : req.body.name.toLowerCase(),
          message : req.body.message.toLowerCase()
        });

        feed.save((err) => {
          if(err){
            if(err.code === 11000){
              res.json({ success: false, message : 'name and avatar alreay exists'});
            } else{
              if(err.errors){
                if(err.errors.avatar){
                  res.json({ success : false, message : err.errors.avatar.message});
                } else{
                  if(err.errors.name){
                    res.json({ success : false, message : err.errors.name.message});
                  } else{
                    if(err.errors.message){
                      res.json({ success : false, message : err.errors.message.message});
                    } else{
                      res.json({ success : false, message : err});
                    }
                  }
                }
              } else{
                res.json({ success: false, message: 'Could not save post. Error: ', err }); 
              }
            }
          } else{
            res.json({ success : true, message : 'Post Succesfully Saved !'});
          }
        });


      }
    }
  }

});


 // Get Feeds
 router.get('/feeds', (req, res) => {
  connection((db) => {
      db.collection('feeds')
          .find()
          .toArray()
          .then((feeds) => {
              response.data = feeds;
              res.json(response);
          })
          .catch((err) => {
              sendError(err, res);
          });
  });
});



  return router; 
}