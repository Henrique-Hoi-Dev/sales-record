import Service from "../app/models/Service";
import FinancialBox from "../app/models/FinancialBox";
import User from "../app/models/User";

import httpStatus from 'http-status-codes';

export default {
  async store(req, res) {    
    let financial_id = res.id

    const { employee_id, name, price, date_service } = req;

    const financial = await FinancialBox.findByPk(financial_id);

    if (!financial) {
      return result = {httpStatus: httpStatus.NOT_FOUND, status: "caixa not found", responseData: services}
    }

    const services = await Service.create({ financial_id, employee_id, name, price, date_service });

    return services
  },
  async index(req, res) {
    const services = await Service.findAll({
      where: { employee_id: req.id },
      attributes: [ 'id', 'name', 'price', 'date_service', 'employee_id'],
      include: [
        {
          model: FinancialBox,
          as: 'financial',
          attributes: [ 'id', 'value_total_service', 'open_caixa', 'close_caixa' ]
        },
        {
          model: User,
          as: 'user',
          attributes: [ 'id', 'name' ]
        }
     ],
    });

    return services
  },
  async getId(req, res) {
    let result = {}
    let serviceId = req.id 
    let services = await Service.findByPk(serviceId, {
      attributes: [ 'id', 'name', 'price', 'date_service', 'employee_id'],
      include: {
        model: FinancialBox,
        as: 'financial',
        attributes: [ 'id', 'value_total_service', 'open_caixa', 'close_caixa' ]
      },
    });

    result = {httpStatus: httpStatus.OK, status: "Success", responseData: services}    
    return result
  },
  async delete(req, res) {
    let result = {}
    const id  = req.id;

    const user = await Service.findByPk(id)

    const UserId = user.employee_id

    const service = await Service.destroy({
      where: {
        id: id,
      },
    });

    if (!service) {
      return res.status(400).json(error);
    }

    result = {httpStatus: httpStatus.OK, status: "successful", responseData: UserId}      
    return result
  }
}