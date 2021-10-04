const Router = require('express')
const fileController = require('../controllers/fileController')
const authMidlleware = require('../middleware/auth.middleware')
const router = new Router()

router.post('', authMidlleware, fileController.createDir)
router.post('/upload', authMidlleware, fileController.uploadFile)
router.get('', authMidlleware, fileController.getFiles)
router.get('download', authMidlleware, fileController.downloadFile)


module.exports = router