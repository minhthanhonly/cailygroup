'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      group_order: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      add_level: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      add_group: {
          type: Sequelize.TEXT,
          allowNull: true,
      },
      add_user: {
          type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Groups');
  }
};