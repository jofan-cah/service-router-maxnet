const express = require('express');
const router = express.Router();
const odpSiteController = require('../src/controllers/odpSiteController');

router.post('/', odpSiteController.createOdpSite);
router.get('/', odpSiteController.getAllOdpSites);
router.get('/:id', odpSiteController.getOdpSiteById);
router.put('/:id', odpSiteController.updateOdpSite);
router.delete('/:id', odpSiteController.deleteOdpSite);

module.exports = router;
