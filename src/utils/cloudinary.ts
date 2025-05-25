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

export default cloudinary;

