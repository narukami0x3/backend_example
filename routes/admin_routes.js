const express = require('express')
const router = express.Router()
const ctrl = require('../controller/admin_controller')
const {admin} = require('../middleware/auth')

router.get('/user',admin,ctrl.getusers)
router.delete('/user/:id',admin,ctrl.rmuser)
router.put('/user/:id',admin,ctrl.edituser)

module.exports = router;