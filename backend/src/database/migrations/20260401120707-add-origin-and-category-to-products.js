'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'origin', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Mari',
    });

    await queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Arábica',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'origin');
    await queryInterface.removeColumn('products', 'category');
  }
};
