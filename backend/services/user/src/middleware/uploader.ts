import { Request, Response, NextFunction } from 'express';
import {generateTimeBasedImageName} from '../utils/hash'
import multer from "multer";
import path from 'path';

interface MulterFiles {
  profileImage?: Express.Multer.File[];  // Profile image: optional, 1 file
  images?: Express.Multer.File[];          // Regular images: optional, up to 5 files
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, `${generateTimeBasedImageName()}${extension}`);
    },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg and jpeg format are allowed!")) 
    }
  };

const upload = multer({ storage, limits: {fileSize: 1024 * 1024}, fileFilter});

export async function uploadRegistrationImages(req: Request, res: Response, next: NextFunction ): Promise<void> {
  const IMAGES_NOT_UPLOADED_ERROR = "Images not uploaded";
  const PROFILE_IMAGES_ERROR = "Profile image is required and must be 1 file"
  const IMAGES_ERROR = "You must upload between 1 to 5 additional images"
  try {
    await new Promise<void>((resolve, reject) => {
      upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'images', maxCount: 5 },
      ])(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          if (err.message === 'File too large') {
            return res.status(400).json({
              error: `File Image too large Max size is 1MB.`,
            });
          }
          console.log(err.message)
          return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
          return res.status(400).json({ error: err.message });
        }
        resolve();
      });
    });
    
    const files = req.files as MulterFiles;
    
    if (!files || !files.profileImage || !files.images) {
      throw new Error(IMAGES_NOT_UPLOADED_ERROR);
    }
    const { profileImage, images } = files;
    if (profileImage.length > 1)
      throw new Error (PROFILE_IMAGES_ERROR );

    if (images.length !== 5)
      throw new Error(IMAGES_ERROR);

    next();
  } catch (error: any) {
    console.error("==============> ", error);
    if(error.message == PROFILE_IMAGES_ERROR )
      res.status(400).json({error: PROFILE_IMAGES_ERROR })
    else if (error.message == IMAGES_ERROR)
      res.status(400).json({error: IMAGES_ERROR})
    else if (error.message == IMAGES_NOT_UPLOADED_ERROR) {
      res.status(400).json({error:IMAGES_NOT_UPLOADED_ERROR})
    }
    else
      res.status(500).json({ error: 'Internal server error' });
    return
  }
}
 
const parceFrom = multer();

export default {uploadRegistrationImages, parceFrom};
