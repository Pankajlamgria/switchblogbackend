{require("dotenv").config();}
const express = require('express')
const connectfuction=require("./database.js");
const app = express()
var cors = require('cors')
const port =process.env.PORT || 4000
app.use(cors())
connectfuction();
console.log("connected");

// to work with the json in form express router and body .
app.use(express.json())

app.use('/api/auth',require("./routes/auth.js"))
app.use('/api/blog',require("./routes/blog.js"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})