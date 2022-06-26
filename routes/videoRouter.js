const Router = require("express");
const router = new Router();
const Controller = require("../controllers/videoController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, Controller.create);
router.get("/", Controller.getAll);
router.get("/:id", Controller.getOne);

router.post("/update/:id", authMiddleware, Controller.update);
router.post("/upload_jpg/:id", authMiddleware, Controller.upload_jpg);
router.post("/upload_mp4/:id", authMiddleware, Controller.upload_mp4);

router.get("/delete/:id", authMiddleware, Controller.delete);

module.exports = router;
