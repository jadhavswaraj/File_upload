

// app create

const express=require('express');
const app= express();

// port found
require("dotenv").config();
const PORT=process.env.PORT || 3000;


// middleware connect
app.use(express.json());
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// db connect
const db=require("./config/database");
db.connect();

// cloud se connect
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mount
const Upload=require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);

// activate server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})