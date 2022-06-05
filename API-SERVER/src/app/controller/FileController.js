import FileService from '../../service/FileService';
import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });
    return res.json(file);
  }
  async getId(req, res) {
    try {
      let response;      
      response = await FileService.getId();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).json(error)
    } 
  }
  async delete(req, res) {
    try {
      let response;     
      response = await FileService.delete(req.params);
      return res.send(response);
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
export default new FileController();
