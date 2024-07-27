const { OltSite } = require('../../models');

exports.createOltSite = async (req, res) => {
  try {
    const oltSite = await OltSite.create(req.body);
    res.status(201).json(oltSite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOltSites = async (req, res) => {
  try {
    const oltSites = await OltSite.findAll();
    res.status(200).json(oltSites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOltSiteById = async (req, res) => {
  try {
    const oltSite = await OltSite.findByPk(req.params.id);
    if (oltSite) {
      res.status(200).json(oltSite);
    } else {
      res.status(404).json({ message: 'OltSite not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOltSite = async (req, res) => {
  try {
    const [updated] = await OltSite.update(req.body, {
      where: { olt_id: req.params.id }
    });
    if (updated) {
      const updatedOltSite = await OltSite.findByPk(req.params.id);
      res.status(200).json(updatedOltSite);
    } else {
      res.status(404).json({ message: 'OltSite not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOltSite = async (req, res) => {
  try {
    const deleted = await OltSite.destroy({
      where: { olt_id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'OltSite not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
