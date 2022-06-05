import Sequelize, { Model } from 'sequelize';

class FinancialBox extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        open_caixa: Sequelize.DATEONLY,
        close_caixa: Sequelize.DATEONLY,
        status: Sequelize.BOOLEAN,
        value_open: Sequelize.DOUBLE,
        value_total_sales: Sequelize.DOUBLE,
        value_total_service: Sequelize.DOUBLE,
        value_total: Sequelize.DOUBLE,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasMany(models.Order, { foreignKey: 'financial_id', as: 'order' });
    this.hasMany(models.Service, { foreignKey: 'financial_id', as: 'service' });
  }
}

export default FinancialBox;
