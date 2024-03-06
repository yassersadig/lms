const Video = require("../models/Video");

const videos_get = async (req, res) => {
  try {
    const videos = await Video.find().limit(10);
    res.status(200).json({ videos });
  } catch (err) {
    res.status(400).json("Something went wrong.");
  }
};

module.exports = {
  videos_get,
};
