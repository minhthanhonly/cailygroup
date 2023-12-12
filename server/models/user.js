'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userid: {
      type: DataTypes.TEXT,
      allowNull: false,
      // references: {
      //   model: 'timecards',  // Tên bảng liên quan mới
      //   key: 'owner',                   // Tên cột khóa chính của bảng liên quan mới
      // },
      // onUpdate: 'CASCADE',
      // onDelete: 'CASCADE',
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password_default: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    realname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authority: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_group: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'groups',  // Tên bảng liên quan mới
        key: 'id',                   // Tên cột khóa chính của bảng liên quan mới
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    user_groupname: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_skype: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_ruby: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_postcode: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_addressruby: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_phone: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_mobile: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_order: {
      type: DataTypes.INTEGER,
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
    modelName: 'User',
  });
  return User;
};