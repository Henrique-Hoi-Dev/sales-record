import * as Yup from 'yup';
import File from "../app/models/File";
import Product from "../app/models/Product";
import httpStatus from 'http-status-codes';

export default {
async store(req, res) {
  let result = {}

  const { name, price, category, quantity, description, avatar_id } = req
  const body = { name, price, category, quantity, description, avatar_id }

  const schema = Yup.object().shape({
    name: Yup.string().required().max(100),
    price: Yup.number().required(),
  });

  if (!(await schema.isValid(body))) {
    return result = {httpStatus: httpStatus.NOT_FOUND, status: "validation failed", responseData: []} 
  }

  const products = await Product.create(body);

  result = {httpStatus: httpStatus.OK, status: "Success", responseData: products}    
  return result
},
async index(req, res) {
    const products = await Product.findAll({
      attributes: [ 
        'id', 
        'name', 
        'price', 
        'category',
        'quantity', 
        'description' 
      ],
      include: [
      {
        model: File,
        as: 'avatar',
        attributes: [ 'url', 'id', 'path' ]
      },
    ]  
  });

  return products
},
async getId(req, res) {
    let product = await Product.findByPk(req.id, {
      attributes: [ 
        'id', 
        'name', 
        'price', 
        'category',
        'quantity', 
        'description' 
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: [ 'url', 'id', 'path' ]
        },
      ] 
    });

    return product
  },
  async update(req, res) {
    let result = {}

    const product = await Product.findByPk(req.id);
    let productUpdated = await product.update(res);

    result = {httpStatus: httpStatus.OK, status: "Success", responseData: productUpdated}    
    return result
  },
  async delete(req, res) {
    let result = {}
    const id  = req.id;

    const products = await Product.destroy({
      where: {
        id: id,
      },
    });

    if (!products) {
      return res.status(400).json({ message: 'product not found' });
    }

    result = {httpStatus: httpStatus.OK, status: "successful", responseData: products}      
    return result
  }
}
