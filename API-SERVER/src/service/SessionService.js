import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../app/models/User';
import File from '../app/models/File';
import authConfig from '../config/auth';
import Adress from '../app/models/Adress';

export default {
  // login do usuario trazendo umas informações primarias
  async storeSession(req, res) {
    let body = req
    const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(body))) {
        return res.status(400).json({ error: 'Falha na validação' });
      }

      const { email, password } = body;

      const user = await User.findOne({
        where: { email },
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url']
          },
          {
            model: Adress,
            as: 'adress',
            attributes:  [ 'id', 'cep', 'logradouro', 'complemento', 
                            'numero', 'bairro', 'cidade', 'uf' ]
          }
        ],
      });

      if (!user) {
        return res.status(401).json({ error: 'usuário não encontrado' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha está incorreta' });
      }

      const { id, name, avatar, company_position, adress, provider, cpf, date_birth } = user;
      const users = { id, name, email, avatar, company_position, provider, cpf, date_birth, adress },
        token = jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        });
        
      return {users, token}
    }
}
