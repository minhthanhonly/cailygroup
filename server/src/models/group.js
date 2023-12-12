'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Groups.init({
    group_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    group_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    add_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    add_group: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    add_user: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    edit_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    edit_group: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    edit_user: {
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
    modelName: 'Groups',
  });
  return Groups;
};