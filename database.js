const mongoose=require("mongoose");
const db2=`${process.env.DATABASE}`;
// function connectdatabase() {
//     // mongoose.connect('mongodb://0.0.0.0:27017/blog');
//     mongoose.connect(`${db}`);
// }
// module.exports=connectdatabase;
function connectdatabase() {
    mongoose.connect(db2,{
        // useCreateIndex:true,
        // useFindAndModify:false,
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("connection started")).catch((error)=>console.log(error.message));
}
module.exports=connectdatabase;