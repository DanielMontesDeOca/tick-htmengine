const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const TwitterController = require('./src/api/controllers/twitter');
const HTMController = require('./src/api/controllers/htm');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/twitter/hashtags/:tag', TwitterController.getHashTags);
app.get('/htm/:modelName', HTMController.getData);
app.post('/htm/:modelName', HTMController.postData);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
