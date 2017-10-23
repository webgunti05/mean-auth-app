const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


let emailLengthChecker = (email) => {
    if(!email){
        return false;
    } else if(email.length < 5 || email.length > 30){
        return false;
    } else{
        return true;
    }
};

let validEmailChecker = (email) =>{
    if(!email){
        return false;
    } else{
        const regExp = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        return regExp.test(email);
    }
}

const emailValidators = [{
   validator : emailLengthChecker,
   message : ' E-mail must be atleast 5 characters but no more than 30' 
},
{
    validator : validEmailChecker,
    message : 'Must be a valid e-mail'
}];


let usernameLengthChecker = (username) =>{
    if(!username){
        return false;
    } else if(username.length < 3 || username.length > 15){
        return false;
    } else{
        return true;
    }
};

let validUsername = (username) =>{
    if(!username) {
        return false;
    } else{
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};


const usernameValidators = [{
    validator: usernameLengthChecker,
    message : 'Username must be atleat 3 characters but no more than 15'
    },
    {
        validator : validUsername,
        message : 'Username must not have special characers and spaces'
    }];

let passwordLengthChecker = (passowrd) =>{
    if(!password){
        return false;
    } else if(password.length < 8 || password.length > 35){
        return false;
    } else{
        return true;
    }
};

let validPassword = (password) =>{
    if(!password){
        return false;
    } else{
        const regExp = new RegExp(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/);
        return regExp.test(password);
    }
};

const passwordValidators = [{
    validator : passwordLengthChecker,
    message : 'Password must be atleat 8 character but no more than 35'
},
{
    validator:validPassword,
    message : 'Must have atleast one uppercase, lowercase, special character, and number'
}];

const userSchema = new Schema({
 email : { type : String, required : true, unique : true, lowercase : true, validate :emailValidators },
 username : { type : String, required : true, unique : true, lowercase : true, validate: usernameValidators},
 password : { type : String, required : true, validate: passwordValidators }
});



userSchema.pre('save', function (next) {
    if(!this.isModified('password'))
    return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);