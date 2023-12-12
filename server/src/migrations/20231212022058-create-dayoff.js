'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dayoffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',  // Tên bảng liên quan mới
          key: 'id',                   // Tên cột khóa chính của bảng liên quan mới
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      date_start: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      date_end: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      time_start: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      time_end: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      day_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      owner: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.dropTable('Dayoffs');
  }
};