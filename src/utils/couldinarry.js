import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_COULD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnClouldinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // console.log(localFilePath);

    // upload file on clouldinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "videotube",
      resource_type: "auto",
    });

    // file has been  uploaded  successfull
    // console.log("file is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload oparation got failed

    return null;
  }
};

const deleteImageOnClouldinary = async (oldImageUrl) => {
  // console.log(oldImageUrl);
  const response = await cloudinary.uploader.destroy(oldImageUrl);
  // console.log(response);
};

const deleteVideoOnClouldinary = async (oldImageUrl) => {
  // console.log(oldImageUrl);
  const response = await cloudinary.uploader.destroy(oldImageUrl, {
    resource_type: "video",
  });
  // console.log(response);
};

export {
  uploadOnClouldinary,
  deleteImageOnClouldinary,
  deleteVideoOnClouldinary,
};
