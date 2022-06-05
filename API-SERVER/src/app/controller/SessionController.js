import SessionService from '../../service/SessionService';

class SessionController {
  async storeSession(req, res) {
    let response;     
    try {
      response = await SessionService.storeSession(req.body);
      return res.status(200).send(response);
        
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
export default new SessionController();
