import CardService from "../../service/CardService";

class CardController {
  async index(req, res) {
    try {
      let response;      
      response = await CardService.index();
      return res.status(200).send(response);
    } catch {
      return res.status(200).json([])
    }
  }
}

export default new CardController()