const analyticsService = require("../services/analyticsService");

exports.getOverview = async (req, res) => {
  const overview = await analyticsService.getOverview();
  res.status(200).json({
    success: true,
    message: "Overview fetched",
    data: overview,
  });
};
