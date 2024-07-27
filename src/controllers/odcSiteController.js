const { OdcSite } = require('../../models');

exports.createOdcSite = async (req, res) => {
  try {
    const odcSite = await OdcSite.create(req.body);
    res.status(201).json(odcSite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOdcSites = async (req, res) => {
  try {
    const odcSites = await OdcSite.findAll();
    res.status(200).json(odcSites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOdcSiteById = async (req, res) => {
  try {
    const odcSite = await OdcSite.findByPk(req.params.id);
    if (odcSite) {
      res.status(200).json(odcSite);
    } else {
      res.status(404).json({ message: 'OdcSite not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOdcSite = async (req, res) => {
  try {
    const [updated] = await OdcSite.update(req.body, {
      where: { odc_id: req.params.id }
    });
    if (updated) {
      const updatedOdcSite = await OdcSite.findByPk(req.params.id);
      res.status(200).json(updatedOdcSite);
    } else {
      res.status(404).json({ message: 'OdcSite not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOdcSite = async (req, res) => {
  try {
    const deleted = await OdcSite.destroy({
      where: { odc_id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'OdcSite not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
