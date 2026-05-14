import fs from 'fs';
import path from 'path';
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

if (!ffmpegPath) {
  throw new Error('ffmpeg-static binary not found. Install ffmpeg-static and ensure it is available.');
}

ffmpeg.setFfmpegPath(ffmpegPath);

export const isVideoMime = (mimeType) => {
  return typeof mimeType === 'string' && mimeType.startsWith('video/');
};

export const convertVideoToMp4 = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-c:v libx264',
        '-preset fast',
        '-crf 23',
        '-c:a aac',
        '-b:a 128k',
        '-movflags +faststart'
      ])
      .format('mp4')
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err))
      .save(outputPath);
  });
};
