const Router = require("express");
const router = new Router();
const Controller = require("../controllers/audioController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, Controller.create);
router.get("/", Controller.getAll);
router.get("/:id", Controller.getOne);
router.post("/update/:id", authMiddleware, Controller.update);
router.get("/delete/:id", authMiddleware, Controller.delete);

module.exports = router;
