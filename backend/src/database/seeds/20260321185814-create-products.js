'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Café Arábica Premium',
        price: 25.90,
        description: 'Grãos de café arábica selecionados, torrados e moídos na hora',
        quantity: 150,
        image: 'https://loremflickr.com/500/500?lock=1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Café Robusta Forte',
        price: 18.50,
        description: 'Café robusta com sabor intenso e encorpado, ideal para espresso',
        quantity: 200,
        image: 'https://loremflickr.com/500/500?lock=2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Café Descafeinado',
        price: 22.00,
        description: 'Café descafeinado com sabor suave e aroma característico',
        quantity: 100,
        image: 'https://loremflickr.com/500/500?lock=3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Espresso Duplo',
        price: 8.50,
        description: 'Duas doses de café expresso fresco preparado na hora',
        quantity: 500,
        image: 'https://loremflickr.com/500/500?lock=4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Cappuccino Clássico',
        price: 12.00,
        description: 'Espresso com leite vaporizado e espuma cremosa de leite',
        quantity: 300,
        image: 'https://loremflickr.com/500/500?lock=5',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Latte Cremoso',
        price: 13.50,
        description: 'Café com leite cremoso, preparado com espresso de qualidade',
        quantity: 280,
        image: 'https://loremflickr.com/500/500?lock=6',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Macchiato Italiano',
        price: 11.00,
        description: 'Espresso manchado com um toque de espuma de leite',
        quantity: 180,
        image: 'https://loremflickr.com/500/500?lock=7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Café com Chocolate',
        price: 14.90,
        description: 'Café quente com chocolate belga e cobertura de chocolate',
        quantity: 120,
        image: 'https://loremflickr.com/500/500?lock=8',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Café Gelado',
        price: 10.50,
        description: 'Café arábica gelado com gelo e leite, perfeito para dias quentes',
        quantity: 250,
        image: 'https://loremflickr.com/500/500?lock=9',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Café Coado Paulista',
        price: 9.90,
        description: 'Café coado tradicional, encorpado e com sabor clássico brasileiro',
        quantity: 350,
        image: 'https://loremflickr.com/500/500?lock=10',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
