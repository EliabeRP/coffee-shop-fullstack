'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john@email.com',
        password_hash: await bcrypt.hash('12345678', 10),
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Alice Smith',
        email: 'alice@email.com',
        password_hash: await bcrypt.hash('alicepass', 10),
        role: 'client',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bob Johnson',
        email: 'bob@email.com',
        password_hash: await bcrypt.hash('bobpass123', 10),
        role: 'client',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Carol White',
        email: 'carol@email.com',
        password_hash: await bcrypt.hash('carolpw1', 10),
        role: 'client',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'David Brown',
        email: 'david@email.com',
        password_hash: await bcrypt.hash('davidpass', 10),
        role: 'client',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Eve Black',
        email: 'eve@email.com',
        password_hash: await bcrypt.hash('evepass2', 10),
        role: 'client',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Frank Green',
        email: 'frank@email.com',
        password_hash: await bcrypt.hash('frankpass', 10),
        role: 'client',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Grace Lee',
        email: 'grace@email.com',
        password_hash: await bcrypt.hash('gracepw3', 10),
        role: 'client',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Henry King',
        email: 'henry@email.com',
        password_hash: await bcrypt.hash('henrypass', 10),
        role: 'client',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Ivy Scott',
        email: 'ivy@email.com',
        password_hash: await bcrypt.hash('ivypass4', 10),
        role: 'client',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});

  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
