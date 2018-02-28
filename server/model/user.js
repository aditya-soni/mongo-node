const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash')

var userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        minlength : 1,
        trim : true,
        unique : true,
        validate : {
            validator : (value)=>{return validator.isEmail(value)},
            message : '{VALUE} is not a valid email address.'
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    tokens : [{
        access : {
            type : String,
            required : true
        },
        token : {
            type : String,
            required : true
        }
    }]
});

userSchema.methods.toJSON = function () {
    let body = _.pick(this,['email','_id']);
    return body
}

userSchema.methods.generateAuthToken = function () {
    // var user = this;
    var access = 'auth';
    var token = jwt.sign({_id : this._id.toHexString(),access},'secretkey').toString();
    // console.log(token)
    this.tokens.push({access,token});
    return this.save().then(
        ()=>{
            return token
        }
    );
}

userSchema.statics.findByToken = function (token){
    var decoded;

    try{
        decoded = jwt.verify(token,'secretkey')
    } catch (e) {
        return Promise.reject();
    }

    return this.findOne({
        '_id' : decoded._id,
        'tokens.access' : 'auth',
        'tokens.token' : token
    });
}

var User = mongoose.model('User',userSchema);



module.exports = {User};