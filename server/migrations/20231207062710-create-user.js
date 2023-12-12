'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.TEXT,
        allowNull: false,
        // references: {
        //   model: 'timecards',  // Tên bảng liên quan mới
        //   key: 'owner',                   // Tên cột khóa chính của bảng liên quan mới
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      password_default: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      realname: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      authority: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user_group: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'groups',  // Tên bảng liên quan mới
          key: 'id',                   // Tên cột khóa chính của bảng liên quan mới
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_groupname: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_email: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_skype: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_ruby: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_postcode: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_addressruby: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_phone: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_mobile: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_order: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      edit_level: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      edit_group: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      edit_user: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      owner: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      editor: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};