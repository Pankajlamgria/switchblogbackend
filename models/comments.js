const mongoose=require("mongoose");
const { Schema } = mongoose;

const commentschema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'blogmodel'},
    name:{type:String,required:true},
    email:{type:String,require:true},
    comment:{type:String,require:true},
    date:{type:Date,default:Date.now}
});
module.exports =mongoose.model('comment', commentschema);;