'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dayoff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dayoff.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',  // Tên bảng liên quan mới
        key: 'id',                   // Tên cột khóa chính của bảng liên quan mới
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    date_start: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_end: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    time_start: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    time_end: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    day_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    owner: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Dayoff',
  });
  return Dayoff;
};