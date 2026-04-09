'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE VIEW v_pedidos_com_desconto AS
      SELECT 
        o.id AS pedido_id,
        o.total_price AS valor_final,
        o.payment_method,
        o.status,
        o.created_at,
        u.id AS usuario_id,
        u.name AS cliente_nome,
        u.email AS cliente_email,
        u.is_flamengo,
        u.assiste_one_piece
      FROM orders o
      JOIN users u ON o.id_user = u.id
      WHERE u.is_flamengo = true 
         OR u.assiste_one_piece = true;
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS v_pedidos_com_desconto;');
  }
};