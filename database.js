const mongoose=require("mongoose");
const db=process.env.DATABASE;
function connectdatabase() {
    // mongoose.connect('mongodb://0.0.0.0:27017/blog');
    mongoose.connect(`${db}`);
}
module.exports=connectdatabase;