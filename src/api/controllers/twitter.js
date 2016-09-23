const database = require('../../database/elasticsearch');
const GetHashtagCount = require('../../core/twitter/get-hashtag-count');

class TwitterController {
  getHashTags(req, res) {
    const {tag} = req.params;
    const controller = new GetHashtagCount(database, tag);

    return controller
      .execute()
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send();
      });
  }
}

module.exports = new TwitterController();
