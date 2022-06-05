module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      financial_id: {
        type: Sequelize.INTEGER,
        references: { model: 'financial_boxes' , key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users' , key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products' , key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price_product: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      discount: {
        type: Sequelize.DOUBLE,
      },
      price_total: {
        type: Sequelize.DOUBLE,
      },
      status: {
        type: Sequelize.ENUM(['open','closed', 'sold']),
        defaultValue: 'open',
      },
      product_quantity: {
        type: Sequelize.DOUBLE,
      },
      mode_payment: {
        type: Sequelize.ENUM(['incash','portion']),
        defaultValue: 'incash',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('orders');
  },
};
