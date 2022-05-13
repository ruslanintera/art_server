const Router = require("express");
const router = new Router();

//================
const userRouter = require("./userRouter");
router.use("/auth", userRouter);
const rackTypeRouter = require("./rackTypeRouter");
router.use("/racktype", rackTypeRouter);

//================

const roleRouter = require("./roleRouter");
router.use("/role", roleRouter);
const manufacturerRouter = require("./manufacturerRouter");
router.use("/manufacturer", manufacturerRouter);
const dcRouter = require("./dcRouter");
router.use("/dc", dcRouter);
const rackRouter = require("./rackRouter");
router.use("/rack", rackRouter);
const rack3dRouter = require("./rack3dRouter");
router.use("/rack3d", rack3dRouter);

module.exports = router;
