const Router = require("express").Router();
const { getOverview } = require("../controllers/analyticsController");
const asyncHandler = require("../utils/asyncHandler");

Router.get("/", asyncHandler(getOverview));

module.exports = Router;
