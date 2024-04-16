
const File=require("../models/File");
const cloudinary=require("cloudinary").v2;

// localfileupload ->handler function
exports.localFileUpload=async (req,res)=>{
    try{
        // fetch file
        const file=req.files.file;
        console.log("done file upload",file);

        let path=__dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path---->",path)
        
        file.mv(path,(err)=>{
            console.log(err);
    }); 

    res.json({
        success:true,
        message:"Local File uploaded successfully",
        
    });
    }
    catch(error){
        console.log(error);
    }
}

// for validation---------------------------------------
function isFileTypeSupported(type,supportTypes){
    return supportTypes.includes(type);
}


// upload to cloudinary--------------------------
async function uploadFileToCloudinary(file,folder,quality){
        const options={folder};
       
        if(quality){
            options.quality=quality;
        }
        options.resource_type = "auto";
        return  await cloudinary.uploader.upload(file.tempFilePath,options);
}

// image upload handler-------------------------------------
exports.imageUpload=async (req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes=["jpg", "png", "jpeg"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            });
        }

        // file format suppported hai
        const responce=await uploadFileToCloudinary(file,"lovebabbar");

        // too save in db
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:responce.secure_url,
        })
        
        res.json({
            success:true,
            imageUrl:responce.secure_url,
            message:"File uploaded successfully",
    })



    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went wrong",
        })
    }
}



// upload vedio--------------------
exports.videoUpload=async (req,res)=>{
    try{
        // fetch data
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.videoFile;
        console.log(file);

        // validation
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            });
        }

        // file format suppported hai upload to cloudinary
        const responce=await uploadFileToCloudinary(file,"lovebabbar");

        // too save in db
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:responce.secure_url,
        })
        
        res.json({
            success:true,
            imageUrl:responce.secure_url,
            message:"Vedio uploaded successfully",
    })



    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went wrong",
        })
    }
}

// imageSizeReducer-------------------------------------


exports.imageSizeReducer=async (req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes=["jpg", "png", "jpeg"];
        const fileType=file.name.split('.')[1].toLowerCase();


        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported"
            });
        }

        // file format suppported hai
        const responce=await uploadFileToCloudinary(file,"lovebabbar",30);

        // too save in db
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:responce.secure_url,
        })
        
        res.json({
            success:true,
            imageUrl:responce.secure_url,
            message:"File uploaded successfully",
    })



    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went wrong",
        })
    }
}
