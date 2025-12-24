const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Create new user service
exports.createUser = async (userData) => {
  try {
    // Hash password if provided
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }
    
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('Email already exists');
    }
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// Get user details service
exports.getUserDetails = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    
    return user;
  } catch (error) {
    throw new Error(`Error fetching user details: ${error.message}`);
  }
};

// Get user role service
exports.getUserRole = async (userId) => {
  try {
    // TODO: Fetch user role from database
    // Example: const role = await UserRoleModel.findOne({ userId });
    
    return {
      userId: userId,
      role: 'admin',
      permissions: ['read', 'write', 'delete']
    };
  } catch (error) {
    throw new Error(`Error fetching user role: ${error.message}`);
  }
};

// Get all users service
exports.getAllUsers = async () => {
  try {
    const users = await User.find()
      .select('-password')  // Exclude password field
      .sort({ createdAt: -1 });  // Sort by newest first
    
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};
