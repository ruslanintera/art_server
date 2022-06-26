const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
router.use("/auth", userRouter);
const rackTypeRouter = require("./rackTypeRouter");
router.use("/racktype", rackTypeRouter);
// const photovideoRouter = require("./photovideoRouter");
// router.use("/photovideo", photovideoRouter);
const videoRouter = require("./videoRouter");
router.use("/video", videoRouter);
const photoRouter = require("./photoRouter");
router.use("/photo", photoRouter);
const audioRouter = require("./audioRouter");
router.use("/audio", audioRouter);

const roleRouter = require("./roleRouter");
router.use("/role", roleRouter);
const manufacturerRouter = require("./manufacturerRouter");
router.use("/manufacturer", manufacturerRouter);
const dcRouter = require("./dcRouter");
router.use("/dc", dcRouter);
// const rackRouter = require("./rackRouter");
// router.use("/rack", rackRouter);

module.exports = router;
