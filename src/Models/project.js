const { deserialize, Admin } = require('mongodb');
const mongose = require('mongoose');
const Schema = mongose.Schema;

const projectSchema = new Schema({
    name:{
        type:String,
        required:true   
    },
    description:{
        type:String,
        required:true
    },
    Admin:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Members:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
},
{
    timestamps:true
});

module.exports = mongose.model('Project',projectSchema);
