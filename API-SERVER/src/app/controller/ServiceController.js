import ServiceService from '../../service/ServiceService'

class ServiceController {
  async store(req, res) {
    try {
      let response;     
      response = await ServiceService.store(req.body, req.params);
      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).json(error)
    }
  }
  async index(req, res) {
    try {
      let response;      
      response = await ServiceService.index(req.params);
      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).json(error)
    }
  }
  async getId(req, res) {
    try {
      let response;      
      response = await ServiceService.getId(req.params);
      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).json(error)
    }
  }
  async delete(req, res) {
    try {
      let response;     
      response = await ServiceService.delete(req.params);
      return res.status(200).send(response);
    } catch {
      return res.status(200).json([])
    }
    
  }
}
export default new ServiceController();
