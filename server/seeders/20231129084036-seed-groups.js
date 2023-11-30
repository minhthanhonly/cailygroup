'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groups', [{
      group_name: 'Chung',
      add_level: 0,
      owner: 'admin',
    },{
      group_name: 'Web',
      add_level: 0,
      owner: 'admin',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
    */
    await queryInterface.bulkDelete('Groups', null, {});
  }
};
