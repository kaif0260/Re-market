import nodemailer from 'nodemailer';
import crypto from 'crypto';

const hasEmailConfig = process.env.EMAIL_USER && process.env.EMAIL_PASS;

const transporter = hasEmailConfig
  ? nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  : null;

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const sendOTP = async (email, otp) => {
  // Development: agar email config nahi hai to OTP sirf console me dikhao
  if (!hasEmailConfig) {
    console.log('\n---------- Re-Market OTP (Email config nahi hai) ----------');
    console.log('Email:', email);
    console.log('OTP:', otp);
    console.log('(env.local me EMAIL_USER, EMAIL_PASS set karo for real email)\n');
    return true;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Re-Market: OTP Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">OTP Verification</h2>
          <p>Your OTP for Re-Market account verification is:</p>
          <h1 style="color: #4CAF50; font-size: 32px; text-align: center; padding: 20px; background: #f5f5f5; border-radius: 5px;">${otp}</h1>
          <p>This OTP will expire in 10 minutes.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this OTP, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return false;
  }
};
