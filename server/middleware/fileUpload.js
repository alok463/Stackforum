import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import { extname } from "path";
import dotenv from 'dotenv';
import  {promisify} from 'util';

dotenv.config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEYS,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEYS,
    region: process.env.AWS_REGION
})


const S3_BUCKET_NAME = 'QAForum';
const s3 = new AWS.S3();
const randomFileName = Array(10).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
const fileNames =  `${randomFileName}${extname(req.file.originalname)}`



const Storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    acl: 'public-read',
    key: function(req, file, callback) {
        callback(null, fileNames)
    }

});


const uploadFileLimits = {

}


