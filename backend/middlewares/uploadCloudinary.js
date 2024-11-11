import multer from "multer";
import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";

// configurazione e creazione del cloud
export const uploadCloudinaryTeamImage = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'teamImage', // cartella di destinazione
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        }
    })
});

export const uploadCloudinaryPlayerImage = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'playerImage', // cartella di destinazione
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        }
    })
});

export const uploadCloudinaryIcon = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'icon', // cartella di destinazione
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        }
    })
})