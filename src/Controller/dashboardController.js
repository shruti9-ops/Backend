const Task = require("../Models/task");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalTasks = await Task.countDocuments({
      assignedTo: userId
    });
    const statusStats = await Task.aggregate([
      { $match: { assignedTo: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const overdueTasks = await Task.find({
      assignedTo: userId,
      dueDate: { $lt: new Date() },
      status: { $ne: "DONE" }
    });

    res.json({
      totalTasks,
      statusStats,
      overdueCount: overdueTasks.length
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};