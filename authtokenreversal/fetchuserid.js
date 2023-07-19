const jwt=require("jsonwebtoken");
const jwt_secret="blogsite";
const fetchuserid=(req,res,next)=>{
    const authtoken=req.header("auth_token");
    if(!authtoken){
        res.json({success:false,error:"you are not loged in so please login first"});
    }
    if(true){
        const userdata=jwt.verify(authtoken,jwt_secret);
        if(!userdata){
            res.json({success:false,error:"you are not loged in so please login first"});
        }
        else{
            req.userid=userdata.userdetails.id;
            next();
        }
    }

}
module.exports=fetchuserid;