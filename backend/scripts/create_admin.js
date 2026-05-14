import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';

dotenv.config({ path: './env.local' });

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL || process.env.MONGO || 'mongodb://127.0.0.1:27017/remarket';

const adminCreds = {
  name: 'Admin',
  email: 'admin@local.test',
  password: 'Admin@123',
  phone: '9999999999',
  role: 'admin'
};

async function main() {
  try {
    console.log('Connecting to DB:', MONGO_URI);
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const existing = await User.findOne({ $or: [ { email: adminCreds.email }, { phone: adminCreds.phone } ] });
    if (existing) {
      console.log('User with same email or phone already exists. Upgrading to admin and resetting password.');
      existing.role = 'admin';
      existing.password = adminCreds.password; // will be hashed by pre-save
      await existing.save();
      console.log('Updated existing user to admin:');
      console.log('  email:', existing.email || adminCreds.email);
      console.log('  password:', adminCreds.password);
      process.exit(0);
    }

    const user = new User(adminCreds);
    await user.save();
    console.log('Admin user created:');
    console.log('  email:', adminCreds.email);
    console.log('  password:', adminCreds.password);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

main();
