'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Config.init({
    config_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    config_key: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    config_value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    owner: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    editor: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Config',
  });
  return Config;
};