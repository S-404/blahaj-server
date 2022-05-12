const Router = require('express')
const router = new Router()
const hrefsController = require("../../controllers/todos/hrefs-controller")

router.post('/hrefs', hrefsController.createHref)
router.put('/hrefs', hrefsController.updateHref)
router.delete('/hrefs/:id', hrefsController.deleteHref)

module.exports = router