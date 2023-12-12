'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Timecard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Timecard.init({
    timecard_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    timecard_month: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    timecard_day: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    timecard_date: {
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
    timecard_temp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Timecard',
  });
  return Timecard;
};