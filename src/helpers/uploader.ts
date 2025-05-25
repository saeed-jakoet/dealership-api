import formidable from "formidable";
import  cloudinary  from "../utils/cloudinary";
import { Buffer } from "buffer";

export const uploadImages = async (files: Blob[], folder: string) => {
    const imageUrls: string[] = [];
    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);
        const imageUrl = await new Promise<string>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto", folder },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }
            );
            uploadStream.end(fileBuffer);
        });
        imageUrls.push(imageUrl);
    }
    return imageUrls;
};