import multer from "multer"
import fs from "node:fs"

const folderName = 'uploads'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(!fs.existSync(folderName)) {
        fs.mkdirSync(folderName, { recursive: true });
    }
    cb(null, folderName)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage: storage })

export default upload