const express=require('express')
const multer=require('multer')
const {uploadMediaToCloudinary}=require('../utils/cloudinary')

const router=express.Router()


const upload=multer({dest:'media/'})

router.post('/upload/v2',upload.array('product',5),async(req,res)=>{

    try{
         if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        // Upload each file to Cloudinary
        const uploadedResults = [];
        for (const file of req.files) {
            const result = await uploadMediaToCloudinary(file.path);
            uploadedResults.push(result.secure_url);
        }

        return res.status(200).json({
            success: true,
            filepath: uploadedResults
        });

    }catch(err){
        console.error('Upload Error:', err);
        return res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
    }
     
})

module.exports=router