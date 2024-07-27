'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OltSite extends Model {
    static associate(models) {
      OltSite.hasMany(models.OdcSite, { foreignKey: 'olt_id' });
    }
  };
  OltSite.init({
    olt_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    olt_name: DataTypes.STRING,
    olt_description: DataTypes.TEXT,
    olt_picture: DataTypes.STRING,
    olt_type_id: DataTypes.INTEGER,
    olt_location_maps: DataTypes.STRING,
    olt_address: DataTypes.STRING,
    olt_port_capacity: DataTypes.INTEGER,
    url: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OltSite',
  });
  return OltSite;
};
