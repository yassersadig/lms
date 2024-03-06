const { Router } = require("express");
const videoController = require("../controllers/videoController");

const router = Router();

router.get("/videos", videoController.videos_get);

module.exports = router;
