'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('orders', [
        {
          id_user: 10,
          products: JSON.stringify([{ id: 1, quantidade: 2 }, { id: 2, quantidade: 1 }]),
          total_price: 25.50,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_user: 11,
          products: JSON.stringify([{ id: 3, quantidade: 1 }]),
          total_price: 10.00,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_user: 12,
          products: JSON.stringify([{ id: 1, quantidade: 1 }, { id: 4, quantidade: 3 }]),
          total_price: 35.00,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_user: 13,
          products: JSON.stringify([{ id: 2, quantidade: 2 }, { id: 4, quantidade: 1 }]),
          total_price: 30.00,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
