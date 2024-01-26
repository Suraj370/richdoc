const asyncHandler = require("../utils/asyncHandler");
const User = require("../model/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    return { accessToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};

const signup = asyncHandler(async (req, res) => {
  try {
    // Destructure fields from the request body
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "fields are missing" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already existed" });
    }

    const user = await User.create({
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select(" -password");

    return res.status(200).json({
      success: true,
      createdUser,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
});

const signin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "fields are missing" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401, "Invalid user credentials");
    }

    const { accessToken } = await generateAccessToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(" -password");

    const options = {
      httpOnly: true,
      secure: false,
    };

    return res.status(200).cookie("accessToken", accessToken, options).json({
      success: true,
      user: loggedInUser,
      accessToken,
      
      message: "user logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "login unsuccessful. Please try again later",
    });
  }
});

const signout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
   
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});
module.exports = { signup, signin, signout, generateAccessToken };
