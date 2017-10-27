const Feed = require('../models/feed');


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






  return router; 
}