const HTMEngine = require('../../lib/htmengine');

class HTMController {
  getData(req, res) {
    const {modelName} = req.params;

    return HTMEngine.getData(modelName)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send();
      });
  }

  postData(req, res) {
    const {modelName} = req.params;
    const {value, timestamp} = req.body;

    return HTMEngine.postData(modelName, value, timestamp)
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send();
      });
  }
}

module.exports = new HTMController();
