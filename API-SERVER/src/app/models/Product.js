import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        avatar_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        price: Sequelize.DOUBLE,
        quantity: Sequelize.DOUBLE,
        description: Sequelize.STRING,
        category: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.hasMany(models.Order, { foreignKey: 'product_id', as: 'order' });
  }
}

export default Product;
