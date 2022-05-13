const Router = require('express')
const router = new Router()
const Controller = require('../controllers/manufacturerController')

router.post('/create', Controller.create)
router.get('/', Controller.getAll)
router.get('/:id', Controller.getOne)
router.post('/update/:id', Controller.update)
router.get('/delete/:id', Controller.delete)

module.exports = router
