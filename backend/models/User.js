const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    } , 
    lastName : {
        type : String,
        required : true,
    } , 
    email : {
        type : String,
        required : true,
    } , 
    description : {
        type : String,
        required : false,
    } , 
    image: {
        type: String,
    },
    password : {
        type : String,
        required : true,
    } , 
    role : { 
        type : String , 
        default : 'user'} 
}); 

const user = mongoose.model('User', userSchema); 
module.exports = user; 
