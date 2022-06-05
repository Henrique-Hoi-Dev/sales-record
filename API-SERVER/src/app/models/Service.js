import Sequelize, { Model } from 'sequelize';

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        financial_id: Sequelize.INTEGER,
        employee_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        price: Sequelize.DOUBLE,
        date_service: Sequelize.DATEONLY
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.FinancialBox, { foreignKey: 'financial_id', as: 'financial' });
    this.belongsTo(models.User, { foreignKey: 'employee_id', as: 'user' });
  }
}

export default Service;
