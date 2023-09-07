import multer from 'multer';

const storage = multer.diskStorage({});
export const multerConfig = multer({ storage });
