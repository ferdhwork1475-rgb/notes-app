import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 1. Create an absolute path to 'uploads' at the main project root
    const uploadPath = path.join(process.cwd(), 'uploads');

    // 2. Safely check and create the folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // 3. Pass the absolute path to Multer's callback
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
export default upload