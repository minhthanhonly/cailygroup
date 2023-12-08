'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.changeColumn('timecard_details', 'id_groupwaretimecard', {
      type: Sequelize.INTEGER,
      references: {
        model: 'timecards',  // Tên bảng liên quan mới
        key: 'id',                   // Tên cột khóa chính của bảng liên quan mới
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
