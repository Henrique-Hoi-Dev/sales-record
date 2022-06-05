import Product from "../app/models/Product";
import Order from "../app/models/Order";
import httpStatus from 'http-status-codes';
import FinancialBox from "../app/models/FinancialBox";
import User from "../app/models/User";
import File from "../app/models/File";

export default  {
  async store(req, res) {
    let result = {}

    let sales_id = res.id

    if (sales_id) {
      const orders = await Order.findByPk(sales_id);

      const { status, product_quantity, discount, product_id } = req
      
      const product = await Product.findByPk(product_id)

      if (status === 'open' || 'sold') {
        if (product.dataValues.quantity < product_quantity) {
          result = {httpStatus: httpStatus.NOT_FOUND, status: "Product not found", responseData: []}    
          return result 
        }
      }
  
      const price_product = (product.dataValues.price * product_quantity)
      
      const porcent = (price_product / 100) 
      const descont = (porcent * discount)
      const price_total = price_product - descont 
  
      await orders.update({ status, product_quantity, price_product, discount, price_total });

      if (status === 'sold') {
        const productQuantity = await Product.findOne({ where: { id: product_id }})
        if (product.dataValues.quantity < product_quantity) {
          const status = 'open'

          await orders.update({status}) 

          result = {httpStatus: httpStatus.NOT_FOUND, status: "Product not found", responseData: []}    
          return result 
        }
        const proQuantity = productQuantity.dataValues.quantity - product_quantity
  
        const quantity = proQuantity
  
        await productQuantity.update({quantity}) 
      }

      result = {httpStatus: httpStatus.OK, status: "Edit sucess!", responseData: orders}    
      return result
    }

    let { financial_id, product_id, name_product, price_product, discount, product_quantity, status } = req;

    const financialBox = await FinancialBox.findOne({ where: { id: financial_id }});
    if (!financialBox) {
      result = {httpStatus: httpStatus.NOT_FOUND, status: "Financial not found", responseData: []}    
      return result
    }

    const existProduct = await Product.findOne({ where: { id: product_id}})
    if (existProduct.dataValues.quantity < product_quantity) {
      result = {httpStatus: httpStatus.NOT_FOUND, status: "Product not exist", responseData: []}    
      return result
    }
    const financialBoxUser = await FinancialBox.findAll({ where: { id: financial_id }});

    const userId = financialBoxUser.map((result) => {
      return result.dataValues.user_id
    })
    const seller_id = userId

    const priceProduct = (price_product * product_quantity)

    if (discount >= 0) {

      const porcent = (priceProduct / 100) 
      const descont = (porcent * discount)
      const price_total = priceProduct - descont 
      const price_product = priceProduct

      const saleses = await Order.create({
        financial_id,
        product_id, 
        seller_id,
        name_product, 
        price_product,
        discount,
        product_quantity, 
        status,
        price_total, 
      }); 

      return saleses
    }
  },
  async index(req, res) {
    let sales = await Order.findAll({
        where: { seller_id: req.id },
        attributes: [ 
          'id', 
          'product_id',
          'name_product', 
          'price_product', 
          'discount',
          'product_quantity', 
          'price_total',
          'status' 
        ],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: [ 'id', 'name', 'category', 'price' ],
            include: [{
              model: File, 
              as: 'avatar',
              attributes: [ 'url', 'id', 'path' ] 
            }]
          },
          {
            model: User,
            as: 'user',
            attributes: [ 'id', 'name' ]
          },
          {
            model: FinancialBox,
            as: 'financial',
            attributes: [ 
              'id', 
              'value_total_sales', 
              'value_total_service', 
              'value_total', 
              'open_caixa', 
              'close_caixa']
          }
        ],
    });

    return sales
  },
  async getId(req, res) {
    let id = req.id

    let salesId = await Order.findByPk(id, {
      attributes: [ 
        'id', 
        'product_id',
        'discount',
        'product_quantity', 
        'status'  
      ],
    });

    return salesId
  },
  async delete(req, res) {
    let result = {}
    const id  = req.id;
    const order = await Order.findByPk(id)

    const saleses = await Order.destroy({
      where: {
        id: id,
      },
    });

    if (!saleses || !order) {
      return result = {httpStatus: httpStatus.NOT_FOUND, status: "Sales not found", responseData: []} 
    }

    const productQuantity = await Product.findOne({ where: { id: order.dataValues.product_id }})
      const quantity = productQuantity.dataValues.quantity + order.dataValues.product_quantity

      await productQuantity.update({quantity}) 

      const user = order.dataValues.seller_id

    result = {httpStatus: httpStatus.OK, status: "successful", responseData: user}      
    return result
  }
}
