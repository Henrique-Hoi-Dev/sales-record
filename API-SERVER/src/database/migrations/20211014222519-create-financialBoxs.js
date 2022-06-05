module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('financial_boxes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      open_caixa: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      close_caixa: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      value_open: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      value_total_sales: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0
      },
      value_total_service: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0
      },
      value_total: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0
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
    return queryInterface.dropTable('financial_boxes');
  },
};
