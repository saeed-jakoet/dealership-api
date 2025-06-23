import cloudinary from "../utils/cloudinary";
import {Buffer} from "buffer";

export const uploadImages = async (files: Buffer[], folder: string) => {
    const imageUrls: string[] = [];
    for (const fileBuffer of files) {
        const base64Str = fileBuffer.toString('base64');
        const dataUri = `data:image/jpeg;base64,${base64Str}`;

        const result = await cloudinary.uploader.upload(dataUri, {
            resource_type: "auto",
            folder,
        });
        imageUrls.push(result.secure_url);
    }
    return imageUrls;
};