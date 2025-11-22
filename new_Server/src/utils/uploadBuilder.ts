import multer from "multer";
import fs from "fs";
import path from "path";

interface UploadOptions {
  folder: string;
  allowedMimeTypes?: string[];
  maxSizeMB?: number;
}

export function createUploader(options: UploadOptions) {
  const uploadDir = path.join(process.cwd(), "uploads", options.folder);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const base = path.basename(file.originalname, ext)
        .replace(/[^a-z0-9_\-]/gi, "-")
        .toLowerCase();

      const timestamp = Date.now();
      const rand = Math.round(Math.random() * 1e9);

      cb(null, `${base}_${timestamp}_${rand}${ext}`);
    },
  });

  const allowedSet = new Set(
    options.allowedMimeTypes ?? ["image/jpeg", "image/png", "image/webp"]
  );

  const fileFilter = (req: any, file: any, cb: any) => {
    if (!allowedSet.has(file.mimetype)) {
      return cb(
        new Error("Invalid file format. File not allowed."),
        false
      );
    }
    cb(null, true);
  };

  const limits = {
    fileSize: (options.maxSizeMB ?? 5) * 1024 * 1024,
  };

  return multer({ storage, fileFilter, limits });
}
