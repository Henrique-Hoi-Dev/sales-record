import Adress from "../app/models/Adress";
import User from "../app/models/User";
import httpStatus from 'http-status-codes';

export default {
  async store(req, res) {
    let user_id = res.user_id

    let { cep, logradouro, complemento, numero, bairro, cidade, uf } = req;

    const user = await User.findByPk(res.user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const adress = await Adress.create({  
      cep, 
      logradouro,
      complemento, 
      numero, 
      bairro, 
      cidade, 
      uf, 
      user_id  
    });

    return adress
  },
  async getId(req, res) {
    let adressId = await Adress.findOne({ where: { user_id: req.id },
      attributes: [
        'id',
        'cep',
        'logradouro',
        'complemento',
        'numero',
        'bairro',
        'cidade',
        'uf'
      ]
    });
    return adressId
  },
  async update(req, res) {
    let result = {}

    const adress = await Adress.findByPk(req.id);
    let adressUpdated = await adress.update(res);

    result = {httpStatus: httpStatus.OK, status: "successful", responseData: adressUpdated}      
    return result
  },
  async delete(req, res) {
    let result = {}
    const id  = req.id;

    const adress = await Adress.destroy({
      where: {
        id: id,
      },
    });

    if (!adress) {
      return res.status(400).json({ message: 'adress not found' });
    }

    result = {httpStatus: httpStatus.OK, status: "successful", responseData: adress}      
    return result
  }
}