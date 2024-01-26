const User = require("../model/user.model");
const asyncHandler = require("../utils/asyncHandler");

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(400).json({ message: "No User found" });
  }

  return res
    .status(200)
    .json({
      success: true,
      user: user,

      message: "user logged in successfully",
    });
});

module.exports = { getUser };
