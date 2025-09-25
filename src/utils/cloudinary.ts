import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from "dotenv";
dotenv.config();

const CLOUD_NAME = process.env.CLOUDINARY_NAME || 'cloud name';
const CLOUD_KEY = process.env.CLOUDINARY_KEY || 'cloud key';
const CLOUD_SECRET = process.env.CLOUDINARY_SECRET || 'cloud secret';

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET
});

// Utility function to generate Cloudinary URL from public ID
export const generateImageUrl = (publicId: string, transformation?: object) => {
    if (!publicId) return '';
    
    const defaultTransformation = {
        width: 1200,
        height: 800,
        crop: "limit",
        quality: "auto:good",
        fetch_format: "auto"
    };
    
    return cloudinary.url(publicId, {
        ...defaultTransformation,
        ...transformation,
        secure: true
    });
};

// Generate multiple image URLs from public IDs
export const generateImageUrls = (publicIds: string[], transformation?: object) => {
    return publicIds.map(id => generateImageUrl(id, transformation));
};

export default cloudinary;

