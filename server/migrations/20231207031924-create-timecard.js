'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Timecards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timecard_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      timecard_month: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      timecard_day: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      timecard_date: {
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
      timecard_temp: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Timecards');
  }
};