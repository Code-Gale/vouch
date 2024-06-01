const { mongoose } = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    console.error('MongoDB URI not found in environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongodbUri);

    console.log('🚀 Connected to MongoDB');
  } catch (error) {
    console.error('❌Failed to connect to MongoDB');
    process.exit(1);
  }
};

module.exports = connectDB;
