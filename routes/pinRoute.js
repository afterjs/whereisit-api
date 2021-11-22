const express = require('express');
const pinController = require("../controllers/pin.controller.js");


const router = express.Router();

router.get('/',  pinController.getAll)
router.get('/:uid',  pinController.getById)
router.get('/type/:type', pinController.getByType)
router.get('/:lat/:long/:range', pinController.getByGeo)

module.exports = router;