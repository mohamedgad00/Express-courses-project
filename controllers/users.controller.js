const asyncWrapper = require("../middlewares/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const User = require("../models/users.model");
const bycrypt = require("bcryptjs");
const generateJWT = require("../utils/generateJWT");

// api rules : it must be *stateless* and client should not store any session data
// *JWT* token based authentication can be implemented for better security

const getAllUsers = asyncWrapper(async (req, res) => {
  // Pagination parameters
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  // Fetch all users from the database using User model
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = appError.create(
      "User already exists",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  // password hashing to be done - bycrypt library
  const hashedPassword = await bycrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename,
  });

  // generate JWT token here and send it to user
  const token = await generateJWT({
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  });
  newUser.token = token;
  await newUser.save(); // saving user to database
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    const error = appError.create(
      "Email and password are required",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    const error = appError.create("user not found", 404, httpStatusText.FAIL);
    return next(error);
  }

  const matchedPassword = await bycrypt.compare(password, user.password);

  if (user && matchedPassword) {
    // logged in successfully
    const token = await generateJWT({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    user.token = token;
    await user.save(); // saving user to database
    return res.json({
      status: httpStatusText.SUCCESS,
      data: { token },
    });
  } else {
    const error = appError.create(
      "Invalid email or password",
      500,
      httpStatusText.ERROR
    );
    return next(error);
  }
});

module.exports = {
  getAllUsers,
  register,
  login,
};
