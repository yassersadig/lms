const { Router } = require("express");
const {
  videos_get,
  videos_post,
  videos_put,
  videos_delete,
} = require("../controllers/videoController");

const router = Router();

router.get("/videos", videos_get);
router.post("/videos", videos_post);
router.get("/videos/:id", videos_get);
router.put("/videos/:id", videos_put);
router.delete("/videos/:id", videos_delete);

module.exports = router;
