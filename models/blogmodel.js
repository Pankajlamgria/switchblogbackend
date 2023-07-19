
const mongoose=require("mongoose");
const { Schema } = mongoose;

const blogschema = new Schema({
    
    user:{type: Schema.Types.ObjectId, ref: 'authentication'},
    // name:{type: Schema.Types.name, ref: 'authentication'},
    name:{type:String,required:true},
    title:{type:String, required:true},
    blogtype:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:Date,default:Date.now},
});
module.exports =mongoose.model('blog', blogschema);;