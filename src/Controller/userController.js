const User = require("../Models/user");

exports.getAllProfile = async (req, res) => {
  try {
    const users = await User.find().select("_id name email");

    res.status(200).json({
      message: "Users fetched successfully",
      users
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching users"
    });
  }
};
