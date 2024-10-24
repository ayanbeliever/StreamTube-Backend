import {v2 as cloudinary} from "cloudinary";
import fs from "fs"

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload an image
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        // console.log("file is uploaded on cloudinary",response);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove locally saved temporary file if uploading fails
        return null;
    }
}

// delete on cloudinary
const deleteOnCloudinary = async(public_url) => {
    try {
        if(!public_url) return null

        const response = await cloudinary.uploader.destroy(public_url, {
            resource_type: "auto"
        })

        return response
    } catch (error) {
        console.log("delete on cloudinary failed ", error);
        return error
    }
}

export { uploadOnCloudinary , deleteOnCloudinary}


// const uploadResult = await cloudinary.uploader
// .upload(
//     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//     }
// )
// .catch((error) => {
//     console.log(error);
// });

// console.log(uploadResult);