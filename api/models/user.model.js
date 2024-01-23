import mongoose from 'mongoose';

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    // Username of the user, must be unique
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // Email of the user, must be unique
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Password of the user
    password: {
      type: String,
      required: true,
    },
    // Avatar URL of the user, default to a placeholder image
    avatar: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
  },
  // Add timestamps to track creation and modification dates
  { timestamps: true }
);

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;