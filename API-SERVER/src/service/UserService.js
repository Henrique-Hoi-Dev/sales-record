import * as Yup from 'yup';
import Adress from '../app/models/Adress';
import File from '../app/models/File';
import User from "../app/models/User";
import httpStatus from 'http-status-codes';

export default {
  async store(req, res) {
    let user = req
    
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(user))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }
    // fazendo verificação email
    const userExist = await User.findOne({ where: { email: user.email } });

    if (userExist) {
      return res.status(400).json({ error: 'Esse email de usuário já existe.'});
    }

    const users = await User.create(user);

    return users;
  },
  async index(req, res) {
    const users = await User.findAll({
      attributes: [ 
        'id', 
        'name', 
        'email', 
        'company_position', 
        'cpf', 
        'date_birth', 
        'cpf', 
        'avatar_id'
      ],
      include: [
      {
        model: File,
        as: 'avatar',
        attributes:  [ 'id', 'path', 'url' ],
      },
      {
        model: Adress,
        as: 'adress',
        attributes:  [ 
            'id', 
            'cep', 
            'logradouro', 
            'complemento', 
            'numero', 
            'bairro', 
            'cidade', 
            'uf' 
          ],
        }
      ],  
    });
    return users;
  },
  async getId(req, res) {
    let user = await User.findByPk(req.id, {
      attributes: [ 
        'id',
        'name', 
        'email', 
        'company_position', 
        'cpf', 
        'avatar_id', 
        'date_birth' 
      ],
      include: [
      {
        model: File,
        as: 'avatar',
        attributes:  [ 'id', 'path', 'url' ],
      },
      {
        model: Adress,
        as: 'adress',
        attributes:  [ 
            'id', 
            'cep', 
            'logradouro', 
            'complemento', 
            'numero', 
            'bairro', 
            'cidade', 
            'uf' 
          ],
        }
      ],  
    });
    return user;
  },
  async update(req, res) {   
    let users = req
    let userId = res.id

    const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string().min(8)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field),
        confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(users))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { email, oldPassword } = users ;
    
    const user = await User.findByPk(userId);
    
    if (email !== user.dataValues.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res.status(400).json({ error: 'Esse email de usuário já existe.'});
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha não corresponde' });
    }


    await user.update(users);

    const result = await User.findByPk(userId, {
      attributes: [
        'id',
        'name', 
        'email', 
        'company_position', 
        'date_birth', 
        'cpf', 
        'avatar_id', 
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Adress,
          as: 'adress',
          attributes: [ 
            'id', 
            'cep', 
            'logradouro', 
            'complemento',          
            'numero', 
            'bairro', 
            'cidade', 
            'uf' 
          ],
        },
      ],
    });

    return result
  },
  async delete(req, res) {
    let result = {}
    
    const id  = req.id;

    const users = await User.destroy({
      where: {
        id: id,
      },
    });

    if (!users) {
      return res.status(400).json({ message: 'adress not found' });
    }

    result = {httpStatus: httpStatus.OK, status: "successful", responseData: users}      
    return result
  }
}