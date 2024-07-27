const { OdpSite } = require('../../models');

exports.createOdpSite = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Tambahkan log untuk melihat data yang dikirim
    const odpSite = await OdpSite.create(req.body);
    console.log('Created OdpSite:', odpSite); // Tambahkan log untuk melihat data yang disimpan
    return res.status(201).json(odpSite);
  } catch (error) {
    console.error('Error Creating OdpSite:', error); // Tambahkan log untuk kesalahan
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOdpSites = async (req, res) => {
  try {
    const odpSites = await OdpSite.findAll();
    res.status(200).json(odpSites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOdpSiteById = async (req, res) => {
  try {
    const odpSite = await OdpSite.findByPk(req.params.id);
    if (odpSite) {
      res.status(200).json(odpSite);
    } else {
      res.status(404).json({ message: 'OdpSite not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOdpSite = async (req, res) => {
  try {
    const [updated] = await OdpSite.update(req.body, {
      where: { odp_id: req.params.id }
    });
    if (updated) {
      const updatedOdpSite = await OdpSite.findByPk(req.params.id);
      res.status(200).json(updatedOdpSite);
    } else {
      res.status(404).json({ message: 'OdpSite not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOdpSite = async (req, res) => {
  try {
    const deleted = await OdpSite.destroy({
      where: { odp_id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'OdpSite not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
