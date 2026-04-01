'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'payment_method', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pix',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'payment_method');
  }
};
