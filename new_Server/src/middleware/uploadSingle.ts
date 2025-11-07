import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from 'fs';
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//const uploadDir = path.join(__dirname, 'uploads')
const uploadDir = path.join(process.cwd(), "uploads", "users");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        const timestamps = Date.now();
        const randomSuffix = Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname).toLowerCase();

        const safeFileName = path.basename(file.originalname, ext).replace('/^a-z0-9_\-/gi', '-');

        const fileName = `${safeFileName}_${timestamps}_${randomSuffix}${ext}`;

        cb(null, fileName);
    }
})

// validate allowed MIME types
const allowedMimeTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
]);

// Filter
const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
        cb(new Error("Invalid file type. Only JPG, PNG, WEBP, and PDF allowed."));
    } else {
        cb(null, true);
    }
};

// file size limit (5 MB)
const limits: multer.Options["limits"] = {
    fileSize: 5 * 1024 * 1024,
};


export const upload = multer({
    storage,
    fileFilter,
    limits
})