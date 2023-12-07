'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Timecard_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Timecard_detail.init({
    timecard_open: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Timecard_detail',
  });
  return Timecard_detail;
};