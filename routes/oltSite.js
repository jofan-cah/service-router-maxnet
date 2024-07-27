const express = require('express');
const router = express.Router();
const oltSiteController = require('../src/controllers/oltSiteController');

router.post('/', oltSiteController.createOltSite);
router.get('/', oltSiteController.getAllOltSites);
router.get('/:id', oltSiteController.getOltSiteById);
router.put('/:id', oltSiteController.updateOltSite);
router.delete('/:id', oltSiteController.deleteOltSite);

module.exports = router;
