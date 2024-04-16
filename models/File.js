a
const mongoose=require("mongoose");
const nodemailer=require("nodemailer");

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});


// post middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("DOC",doc)

        // transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

     // mail send
    let info=await transporter.sendMail({
    from:`Swaraj jadhav`,
    to:doc.email,
    subject:"new file uploaded",
    html:`<h2>Hello ji</h2><p>file uploaded View hear: <a href="${doc.imageUrl}>${doc.imageUrl}</a> </p> `,
})

    console.log("info",info);
    }
    catch(error){
        console.error(error);
    }
});



const File=mongoose.model("File",fileSchema);
module.exports = File;