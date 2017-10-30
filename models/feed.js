const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise; 
const Schema = mongoose.Schema; 
const bcrypt = require('bcrypt-nodejs'); 




//feeds validations

let avatarLengthChecker = (avatar) =>{
  if(!avatar){
    return false;
  } else{
    if(avatar.length < 5 || avatar.length > 500 ){
      return false;
    } else{
      return true;
    }
  }
};

let validAvatarChecker = (avatar) =>{
  if(!avatar){
    return false;
  } else{
    const regExp = new RegExp(/\.(gif|jpg|jpeg|tiff|png)$/i);
    return regExp.test(avatar);
  }
};

const avatarValidators = [
  {
    validator : avatarLengthChecker,
    message : 'Avatar must be atleat 5 characters but no more than 500'
  },
  {
    validator : validAvatarChecker,
    message : 'The avatar URL must end with .jpg, .jpeg or .png'
  }
];

//name filed validates

let nameLengthChecker = (name) => {
  if(!name){
    return false;
  } else{
    if(name.length < 3 || name.length > 30){
      return false;
    } else{
      return true;
    }
  }
};

let validNameChecker = (name) =>{
  if(!name){
    return false;
  } else{
    const regExp = new RegExp(/^[a-zA-Z\s\d\-\.]+$/i);
    return regExp.test(name);
  }
};

const nameValidators = [
  {
    validator : nameLengthChecker,
    message : 'Name must be atleast 3 characters but no more than 30'
  },
  {
    validator : validNameChecker,
    message : 'Must be a name'
  }
];


// feed message validator

let messageLengthChecker = (message) => {
  if(!message){
    return false;
  } else{
    if(message.length < 50 || message.length > 1000){
      return false;
    } else{
      return true;
    }
  }
};


let validMessageChecker = (message) => {
  if(!message){
    return flase;
  } else{
    const regExp = new RegExp(/^[a-zA-Z\s\d\.]+$/i);
    return regExp.test(message);
  }
};

const messageValidators = [
  {
    validator : messageLengthChecker,
    message : 'Message must be atleast 50 charcters but no more than 1000 characters'
  },
  {
    validator : validMessageChecker,
    message : 'this must be a message'
  }
];



const feedSchema = new Schema({
  avatar :  {type : String, required : true, unique : true, validate : avatarValidators},
  name : { type : String, required : true, unique : true, validate : nameValidators},
  message : { type : String, required : true, unique : true, validate : messageValidators}
});





module.exports = mongoose.model('Feed', feedSchema);
