const Video = require("../models/Video");

const videos_get = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const video = await Video.findById(id);
      res.status(200).json({ video });
      return;
    }
    const videos = await Video.find().limit(10);
    res.status(200).json({ videos });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something went wrong.");
  }
};

const videos_post = async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.status(201).json({ video });
  } catch (err) {
    res.status(400).json("Something went wrong.");
  }
};

const videos_put = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ video });
  } catch (err) {
    res.status(400).json("Something went wrong.");
  }
};

const videos_delete = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(400).json("Something went wrong.");
  }
};

module.exports = {
  videos_get,
  videos_post,
  videos_put,
  videos_delete,
};
