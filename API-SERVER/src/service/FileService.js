import File from "../app/models/File";
import httpStatus from 'http-status-codes';
import fs from 'fs';

export default {
  async getId(req, res) {
    let product = await File.findAll()
    return product;
  },
  async delete(req, res) {
    let result = {}
    const id  = req.id;

    const path = await File.findOne({ where: { id: id}, attributes: ['url']})

    // const filePath = path.dataValues.path
    // const files = await File.destroy({
    //   where: {
    //     id: id,
    //   },
    // });

    fs.unlink(text, (error) => {
      if (!error) {
        console.log(false);
      } else {
        console.log('Erro ao deletar arquivo.');
      }
    });
    
    
    // if (typeof req.body.photo === undefined) {         
    //     funcao.deleteFile(pathfile);       
    // } 

    // if (!files) {
    //     return res.status(400).json({ message: 'avatar not found' });
    // }

    result = {httpStatus: httpStatus.OK, status: "successful", responseData: path}      
    return result
  }
}