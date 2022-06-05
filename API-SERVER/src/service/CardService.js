import Product from "../app/models/Product";
import Service from "../app/models/Service";
import Order from "../app/models/Order";

export default {
  async index() {
    const products = await Product.findAll();
    const services = await Service.findAll();
    const order = await Order.findAll();

    const priceTotalProduct = products.map(function (res) {
      const valorTotal = res.dataValues.price * res.dataValues.quantity
      return valorTotal
    })
    const totalProduct = priceTotalProduct.reduce(function(previousValue, currentValue) {
      return Number(previousValue) + Number(currentValue);
    }, 0 && priceTotalProduct)

    const quantityProduct = products.map(function (res) {
      return parseInt(res.dataValues.quantity)
    })
    const totalQuantityProduct = quantityProduct.reduce(function(previousValue, currentValue) {
      return Number(previousValue) + Number(currentValue);
    }, 0 && quantityProduct)

    const valorService = services.map(function (result) {
      return parseInt(result.dataValues.price);
    })
    const totalService = valorService.reduce(function(previousValue, currentValue) {
      return Number(previousValue) + Number(currentValue);
    }, 0 && valorService)
    
    const valorOrder = order.map(function (result) {
      if (result.dataValues.status === 'sold') {
        return result.dataValues.price_total;
      }
    })
    const filValor = valorOrder.filter(function (i) {
      return i
    })
    const totalOrder = filValor.reduce(function(previousValue, currentValue) {
      return Number(previousValue) + Number(currentValue);
    }, 0 && valorOrder)

    return {totalService, totalQuantityProduct, totalProduct, totalOrder}
  }
}