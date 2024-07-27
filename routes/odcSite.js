const express = require('express');
const router = express.Router();
const odcSiteController = require('../src/controllers/odcSiteController');

router.post('/', odcSiteController.createOdcSite);
router.get('/', odcSiteController.getAllOdcSites);
router.get('/:id', odcSiteController.getOdcSiteById);
router.put('/:id', odcSiteController.updateOdcSite);
router.delete('/:id', odcSiteController.deleteOdcSite);

module.exports = router;
