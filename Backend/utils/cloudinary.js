const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadMediaToCloudinary = async (filePath) => {
    try {
        let result=await cloudinary.uploader.upload(filePath, {
            folder: "Buy-Jump",
            resource_type: 'auto'
        })
        console.log(result)
        return result

    } catch (err) {
         console.error("Cloudinary Upload Error:", err)
    }

}

const deleteMediaFromCloudinary=async(publicId)=>{
      try {
        let result=await cloudinary.uploader.destroy(publicId)
        return result

    } catch (err) {
         console.error("Cloudinary Delete Error:", err)
    }
}

module.exports={uploadMediaToCloudinary, deleteMediaFromCloudinary}