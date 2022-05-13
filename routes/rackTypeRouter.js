/**
const Router = require('express')
const router = new Router()
const Controller = require('../controllers/rackTypeController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/create', authMiddleware, Controller.create)
router.get('/', Controller.getAll)
router.get('/:id', Controller.getOne)

router.post('/update/:id', authMiddleware, Controller.update)
router.post('/updatejpg/:id', authMiddleware, Controller.updatejpg)
router.post('/uploadjpg/:id', authMiddleware, Controller.uploadjpg)
router.post('/uploadglb/:id', authMiddleware, Controller.uploadglb)
router.get('/delete/:id', authMiddleware, Controller.delete)

// router.post('/update/:id', Controller.update)
// router.post('/updatejpg/:id', Controller.updatejpg)
// router.post('/uploadjpg/:id', Controller.uploadjpg)
// router.get('/delete/:id', Controller.delete)

module.exports = router
/**/

const Router = require("express");
const router = new Router();
const Controller = require("../controllers/rackTypeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", Controller.create);
router.get("/", Controller.getAll);
router.get("/:id", Controller.getOne);

router.post("/update/:id", Controller.update);
router.post("/updatejpg/:id", Controller.updatejpg);
router.post("/uploadjpg/:id", Controller.uploadjpg);
router.post("/uploadmp3/:id", Controller.uploadmp3);

router.post("/uploadglb/:id", Controller.uploadglb);
router.post("/uploadglbjpg/:id", Controller.uploadglbjpg);

router.get("/delete/:id", Controller.delete);

module.exports = router;
/**/
