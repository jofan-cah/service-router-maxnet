'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OdpSite extends Model {
    static associate(models) {
      OdpSite.belongsTo(models.OdcSite, { foreignKey: 'odc_id' });
    }
  };
  OdpSite.init({
    odp_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    odp_name: DataTypes.STRING,
    odp_description: DataTypes.TEXT,
    odp_picture: DataTypes.STRING,
    odp_type_id: DataTypes.INTEGER,
    odp_location_maps: DataTypes.STRING,
    odp_address: DataTypes.STRING,
    odp_port_capacity: DataTypes.INTEGER,
    odc_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OdpSite',
  });
  return OdpSite;
};
