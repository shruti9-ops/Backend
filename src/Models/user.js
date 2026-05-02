const mongose = require('mongoose');
const Schema = mongose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Admin','Member'],
        default:'Member'
    }

});

module.exports = mongose.model('User',userSchema);