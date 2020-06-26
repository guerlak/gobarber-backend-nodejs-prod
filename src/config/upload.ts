import multer, { StorageEngine } from "multer";
import path from "path";
import crypto from "crypto";

const tempFolder = path.resolve(__dirname, "..", "..", "temp");
const uploadsFolder = path.resolve(__dirname, "..", "..", "temp", "uploads");

interface IUploadConfig {
  directory: string;
  uploadsFolder: string;
  driver: "s3" | "disk";
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  directory: tempFolder,
  uploadsFolder: uploadsFolder,
  driver: process.env.STORAGE_DRIVER,
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename: (req, file, cb) => {
        const fileHash = crypto.randomBytes(10).toString("HEX");
        const fileName = `${fileHash}-${file.originalname}`;
        return cb(null, fileName);
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: "gobarber-guerlak",
    },
  },
} as IUploadConfig;
