const Router = require("express");
const router = new Router();
const Controller = require("../controllers/rackTypeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, Controller.create);
router.get("/", Controller.getAll);
router.get("/:id", Controller.getOne);

router.post("/update/:id", authMiddleware, Controller.update);
router.post("/updatejpg/:id", authMiddleware, Controller.updatejpg);
router.post("/uploadjpg/:id", authMiddleware, Controller.uploadjpg);
router.post("/uploadmp3/:id", authMiddleware, Controller.uploadmp3);

router.post("/uploadglb/:id", authMiddleware, Controller.uploadglb);
router.post("/uploadglbjpg/:id", authMiddleware, Controller.uploadglbjpg);

router.get("/delete/:id", authMiddleware, Controller.delete);

module.exports = router;
