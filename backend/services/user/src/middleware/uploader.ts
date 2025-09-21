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
      cb(null, false);
      return cb(new Error("Only .jpg and jpeg format are allowed!"))
    }
  };

const upload = multer({ storage, limits: {fileSize: 1024 * 1024}, fileFilter});

export async function uploadRegistrationImages(req: Request, res: Response, next: NextFunction ): Promise<void> {
  try {
    await new Promise<void>((resolve, reject) => {
      upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'images', maxCount: 2 },
      ])(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          if (err.message === 'File too large') {
            return res.status(400).json({
              error: `Multer error: ${err.message}. Max size is 1MB.`,
            });
          }
          return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
          return res.status(400).json({ error: err.message });
        }
        resolve();
      });
    });
    const { profileImage, images } = req.files as MulterFiles;
    console.log(images, profileImage);

    if (!profileImage || profileImage.length !== 1)
      throw new Error ("Profile image is required and must be 1 file.");

    if (!images || images.length > 2)
      throw new Error("You must upload between 1 to 2 additional images.");

    next();
  } catch (error: any) {
    console.error(error);
    if(error.message == "Profile image is required and must be 1 file.")
      res.status(400).json({error: 'Profile image is required and must be 1 file.'})
    else if (error.message == "You must upload between 1 to 2 additional images.")
      res.status(400).json({error: 'You must upload between 1 to 2 additional images.'})
    else
      res.status(500).json({ error: 'Internal server error' });
  }
}

const parceFrom = multer();

export default {uploadRegistrationImages, parceFrom};
