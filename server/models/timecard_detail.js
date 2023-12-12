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
    id_groupwaretimecard: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Timecard',  // Tên bảng liên quan mới
        key: 'id',                   // Tên cột khóa chính của bảng liên quan mới
      }
    },
    timecard_open: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timecard_close: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timecard_originalopen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timecard_originalclose: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timecard_interval: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timecard_originalinterval	: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timecard_time: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timecard_timeover: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timecard_timeinterval: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timecard_comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Timecard_detail',
  });
  return Timecard_detail;
};