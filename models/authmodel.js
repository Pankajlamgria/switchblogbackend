const mongoose=require("mongoose");
const { Schema } = mongoose;

const authschema = new Schema({
    name:{type:String, required:true},
    profession:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    date:{type:Date,default:Date.now},
});
module.exports =mongoose.model('authentication', authschema);;