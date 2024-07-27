'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OdcSite extends Model {
    static associate(models) {
      OdcSite.belongsTo(models.OltSite, { foreignKey: 'olt_id' });
      OdcSite.hasMany(models.OdpSite, { foreignKey: 'odc_id' });
    }
  };
  OdcSite.init({
    odc_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    odc_name: DataTypes.STRING,
    odc_description: DataTypes.TEXT,
    odc_picture: DataTypes.STRING,
    odc_type_id: DataTypes.INTEGER,
    odc_location_maps: DataTypes.STRING,
    odc_address: DataTypes.STRING,
    odc_port_capacity: DataTypes.INTEGER,
    olt_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OdcSite',
  });
  return OdcSite;
};
