'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Timecard_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_groupwaretimecard: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      timecard_open: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      timecard_close: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      timecard_originalopen: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      timecard_originalclose: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      timecard_interval: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      timecard_originalinterval	: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      timecard_time: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      timecard_timeover: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      timecard_timeinterval: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      timecard_comment: {
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
    await queryInterface.dropTable('Timecard_details');
  }
};