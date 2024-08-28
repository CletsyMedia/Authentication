import mongoose from "mongoose";
export const connect2DB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`)
    process.exit(1); // 1 means exit with failure
  }
};
