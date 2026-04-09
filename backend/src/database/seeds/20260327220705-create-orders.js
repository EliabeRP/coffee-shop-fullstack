'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      {
        id_user: 1,
        products: JSON.stringify([{ id: 1, quantidade: 2 }, { id: 2, quantidade: 1 }]),
        total_price: 25.50,
        payment_method: 'pix',
        status: 'entregue',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: 2,
        products: JSON.stringify([{ id: 3, quantidade: 1 }]),
        total_price: 10.00,
        payment_method: 'boleto',
        status: 'pendente',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: 3,
        products: JSON.stringify([{ id: 1, quantidade: 1 }, { id: 4, quantidade: 3 }]),
        total_price: 35.00,
        payment_method: 'credit_card',
        status: 'enviado',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: 4,
        products: JSON.stringify([{ id: 2, quantidade: 2 }, { id: 4, quantidade: 1 }]),
        total_price: 30.00,
        payment_method: 'pix',
        status: 'pendente',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};