import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`ERROR in DB Connection: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
