import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Controller function for user signup
export const signup = async (req, res, next) => {
  // Extract user input from the request body
  const { username, email, password } = req.body;

  // Hash the password using bcryptjs
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new User instance with hashed password
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    // Save the new user to the database
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    // Handle any errors that may occur during user creation
    next(error);
  }
};

// Controller function for user signin
export const signin = async (req, res, next) => {
  // Extract user credentials from the request body
  const { email, password } = req.body;

  try {
    // Find user with the provided email in the database
    const validUser = await User.findOne({ email });

    // If user not found, return an error
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    // Compare the provided password with the hashed password in the database
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    // If password is not valid, return an error
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Generate a JWT token and set it in a cookie
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    // Handle any errors that may occur during signin
    next(error);
  }
};

// Controller function for handling Google OAuth signin
export const google = async (req, res, next) => {
  try {
    // Check if the user already exists in the database
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // If user exists, generate a JWT token and set it in a cookie
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // If user doesn't exist, generate a random password, hash it, and create a new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Create a new user with Google OAuth information
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      // Save the new user to the database
      await newUser.save();

      // Generate a JWT token for the new user and set it in a cookie
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    // Handle any errors that may occur during Google OAuth signin
    next(error);
  }
};

// Controller function for user signout
export const signOut = async (req, res, next) => {
  try {
    // Clear the access token cookie to sign the user out
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    // Handle any errors that may occur during signout
    next(error);
  }
};