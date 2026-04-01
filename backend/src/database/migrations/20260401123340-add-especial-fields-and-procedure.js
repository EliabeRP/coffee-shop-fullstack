// migrations/[timestamp]-add-special-fields-and-procedure.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'is_flamengo', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    await queryInterface.addColumn('users', 'assiste_one_piece', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE PROCEDURE sp_aplicar_desconto_perfil(p_order_id INT, p_percentual DECIMAL)
      LANGUAGE plpgsql
      AS $$
      BEGIN
        UPDATE orders 
        SET total_price = total_price * (1 - p_percentual / 100)
        WHERE id = p_order_id;
      END;
      $$;
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'is_flamengo');
    await queryInterface.removeColumn('users', 'assiste_one_piece');
    await queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS sp_aplicar_desconto_perfil;');
  }
};