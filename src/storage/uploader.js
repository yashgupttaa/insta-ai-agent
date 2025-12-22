require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

async function uploadVideo(localPath) {
    console.log("☁️ Uploading video to Cloudinary");

    const res = await cloudinary.uploader.upload(localPath, {
        resource_type: "video",
        folder: "insta-reels"
    });

    console.log("✅ Uploaded:", res.secure_url);
    return res.secure_url;
}

module.exports = { uploadVideo };
