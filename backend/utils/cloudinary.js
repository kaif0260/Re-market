import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadsRoot = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsRoot)) fs.mkdirSync(uploadsRoot, { recursive: true });

const makeUploadFolder = (folder) => {
  const folderPath = path.join(uploadsRoot, ...folder.split('/'));
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
  return folderPath;
};

const getLocalPublicUrl = (fileName, folder) => {
  const baseUrl = process.env.BACKEND_PUBLIC_URL || 'http://localhost:5000';
  return `${baseUrl}/uploads/${folder}/${fileName}`.replace(/\\/g, '/');
};

const moveToLocalUploads = (filePath, folder) => {
  const folderPath = makeUploadFolder(folder);
  const ext = path.extname(filePath) || '';
  const fileName = `upload-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const destination = path.join(folderPath, fileName);
  fs.renameSync(filePath, destination);
  return {
    secureUrl: getLocalPublicUrl(fileName, folder),
    publicId: `local:${folder}/${fileName}`
  };
};

function looksLikePlaceholder(v) {
  if (v == null || String(v).trim() === '') return true;
  const s = String(v).trim();
  return /^your_/i.test(s) || /^example/i.test(s) || /^changeme/i.test(s);
}

/** Real Cloudinary dashboard values — not template text */
export function isCloudinaryConfigured() {
  const name = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!name || !key || !secret) return false;
  if (looksLikePlaceholder(name) || looksLikePlaceholder(key) || looksLikePlaceholder(secret)) return false;
  return true;
}

if (!isCloudinaryConfigured()) {
  console.warn(
    'Cloudinary not fully configured (or still using placeholders). Uploads will fallback to local /uploads storage. Set real CLOUDINARY_* in backend/env.local for CDN URLs on all devices.'
  );
}



/**
 * @param {string} filePath
 * @param {string} folder
 * @param {{ resourceType?: 'auto' | 'image' | 'video' | 'raw' }} [options]
 */
export const uploadToCloudinary = async (filePath, folder = 'remarket', options = {}) => {
  if (!isCloudinaryConfigured()) {
    return moveToLocalUploads(filePath, folder);
  }
  try {
    const resourceType = options.resourceType || 'auto';
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: resourceType
    });

    // Delete local temp file after upload
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return {
      secureUrl: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    // Clean up local temp file on error
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    throw new Error(`Failed to upload media: ${error.message || 'Unknown error'}`);
  }
};


export const uploadMultipleToCloudinary = async (files, folder = 'remarket') => {
  if (!isCloudinaryConfigured()) {
    return files.map((file) => moveToLocalUploads(file.path, folder));
  }
  try {
    const uploadPromises = files.map((file) =>
      cloudinary.uploader
        .upload(file.path, {
          folder: folder,
          resource_type: 'auto'
        })
        .then((result) => {
          // Delete local temp file after upload
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          return {
            secureUrl: result.secure_url,
            publicId: result.public_id
          };
        })
    );

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    // Clean up any remaining files
    files.forEach((file) => {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    });
    throw new Error(`Failed to upload media: ${error.message || 'Unknown error'}`);
  }
};


// Multer disk storage ke liye temp folder (Cloudinary-only final storage)
// IMPORTANT: Final URLs MongoDB me Cloudinary secure_url hi honge.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // use OS temp folder (no persistent backend/uploads)
    cb(null, path.join(process.cwd(), 'tmp'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

// Ensure tmp folder exists
const tmpDir = path.join(process.cwd(), 'tmp');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

export const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // allow larger video uploads
  fileFilter: (req, file, cb) => {
    const isImage = file.mimetype.startsWith('image/');
    const isVideo = file.mimetype === 'video/mp4' || file.mimetype.startsWith('video/');
    const allowed = isImage || isVideo;
    if (allowed) cb(null, true);
    else cb(new Error('Only image/* and video/* are allowed'));
  }
});

