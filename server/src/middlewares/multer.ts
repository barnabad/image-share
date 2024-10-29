import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Setup storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(import.meta.dirname, "..", "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Initialize multer with the storage configuration
export const upload = multer({ storage: storage });
