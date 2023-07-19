const express = require("express");
const blogmodel = require("../models/blogmodel.js");
// const authmodelmodel = require("../models/authmodel.js");
const commentmodel = require("../models/comments.js");
const fetchuserid = require("../authtokenreversal/fetchuserid.js");
const jwt = require("jsonwebtoken");
const authmodel = require("../models/authmodel.js");
const router = express.Router();

router.post("/addblog", fetchuserid, async (req, res) => {
  const bodydata = req.body;
  let success = false;
  if (
    (bodydata.title.length =
      0 || bodydata.description.length == 0 || bodydata.blogtype.length == 0)
  ) {
    res.json({ success, error: "Please enter the valid Details of blog." });
  } else {
    try {
      const userid = req.userid;
      const userdata=await authmodel.findById(userid);
      if (!userid) {
        res.json({ success, error: "Please login first." });
      } else {
        const blogdetailsbyuser = await blogmodel.create({
          name:userdata.name,
          user: userid,
          title: bodydata.title,
          blogtype: bodydata.blogtype,
          description: bodydata.description,
        });
        success = true;
        res.json({ success, blogdetailsbyuser });
      }
    } catch (error) {
      res.json({ success, error });
    }
  }
});
router.delete("/deleteblog/:id", fetchuserid, async (req, res) => {
  // by params hook we can access any value present in the url .
  const blogid = req.params.id;
  let success = false;

  try {
    const userid = req.userid;
    if (!userid) {
      res.json({ success, error: "Access denied." });
    } else {
      const deleteblog = await blogmodel.findByIdAndDelete(blogid);

      success = true;
      // console.log("successfully deleted");
      res.json({ success, deleteblog });
    }
  } catch (error) {
    res.json({ success, error });
  }
});


router.post("/update/:id", async (req, res) => {
  const blogid = req.params.id;
  let success = false;
  const bodydata=req.body;
  try {
      success = true;
      const updateddata={title:bodydata.title,  
      description:bodydata.description,
      blogtype:bodydata.blogtype
      }
      const updatedblog=await blogmodel.findByIdAndUpdate(req.params.id,{$set:updateddata},{new:true});
      res.json({ success, updatedblog });
    
  } catch (error) {
    res.json({ success, error });
  }
});




router.get("/allblog", async (req, res) => {
  let success = true;
  if (!req.header("auth_token")) {
    const allblogs = await blogmodel.find({});

    res.json({ success, allblogs });
  } else {
    const token = req.header("auth_token");
    const user = jwt.verify(token, "blogsite");
    const userid = user.userdetails.id;
    const allblogs = await blogmodel.find({ user: { $ne: userid } });
    res.json({ success, allblogs});
  }
});
router.get("/myblog", async (req, res) => {
  let success = true;
  if (req.header("auth_token")) {
    const token = req.header("auth_token");
    const user = jwt.verify(token, "blogsite");
    const userid = user.userdetails.id;
    const allblogs = await blogmodel.find({ user:userid });
    res.json({ success, allblogs});

  } else {
    success=false;
    res.json({success,error:"login first"});
  }
});

router.get("/typeblog/:type", async (req, res) => {
  let success = true;
  const typeblog=req.params.type;
  if (!req.header("auth_token")) {
    const allblogs = await blogmodel.find({blogtype:typeblog});
    // console.log("notfound authkey");
    res.json({ success, allblogs });
  } else {
    const token = req.header("auth_token");
    const user = jwt.verify(token, "blogsite");
    const userid = user.userdetails.id;
    const allblogs = await blogmodel.find({blogtype:typeblog});
    res.json({ success, allblogs });
  }
});



router.post("/addcomment/:id", fetchuserid, async (req, res) => {
  try {
    const userid = req.userid;
    const blogid=req.params.id;
    if (!userid) {
      res.json({ success: false, error: "Create an account first" });
    } else {
      const bodydata = req.body;
      const userdetail = await authmodel.findById(userid);
      const comment = await commentmodel.create({
        user:blogid,
        name: userdetail.name,
        email: userdetail.email,
        comment: bodydata.comment,
      });
      res.json({success:true,comment});
    }
  } catch (error) {
    res.json({ success: false, error });
  }
});
router.get("/getcomment/:id", fetchuserid, async (req, res) => {
  try {
    const userid = req.userid;
    const blogid=req.params.id;
    if (!userid) {
      res.json({ success: false, error: "Create an account first" });
    } else {
      const arraycomment=await commentmodel.find({user:blogid}).sort({_id:-1});
      res.json({success:true,arraycomment});

    }
  } catch (error) {
    res.json({ success: false, error });
  }
});

module.exports = router;
