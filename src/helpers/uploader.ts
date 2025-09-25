import cloudinary from "../utils/cloudinary";
import {Buffer} from "buffer";

export const uploadImages = async (files: Buffer[], folder: string, vehicleId?: string) => {
    const imagePublicIds: string[] = [];
    const timestamp = Date.now();
    
    for (let i = 0; i < files.length; i++) {
        const fileBuffer = files[i];
        const base64Str = fileBuffer.toString('base64');
        const dataUri = `data:image/jpeg;base64,${base64Str}`;

        // Create ordered public ID for proper sequencing
        const publicIdSuffix = vehicleId ? `${vehicleId}_${timestamp}_${i.toString().padStart(2, '0')}` : `${timestamp}_${i.toString().padStart(2, '0')}`;
        
        const result = await cloudinary.uploader.upload(dataUri, {
            resource_type: "auto",
            folder,
            public_id: `${folder}/${publicIdSuffix}`,
            quality: "auto",
            fetch_format: "auto",
            transformation: [
                { width: 1200, height: 800, crop: "limit" },
                { quality: "auto:good" }
            ]
        });
        imagePublicIds.push(result.public_id);
    }
    return { imagePublicIds };
};

export const deleteImagesFromCloudinary = async (publicIds: string[]) => {
    try {
        const deletePromises = publicIds.map(publicId => 
            cloudinary.uploader.destroy(publicId)
        );
        await Promise.all(deletePromises);
        return true;
    } catch (error) {
        console.error("Error deleting images from Cloudinary:", error);
        throw error;
    }
};