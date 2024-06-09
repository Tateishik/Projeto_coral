const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const app = express();
const port = 3000;

let model;

(async () => {
  model = await tf.loadLayersModel('file://' + path.join(__dirname, '../ml/model/model.json'));
})();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/predict', (req, res) => {
  const healthIndex = parseFloat(req.query.healthIndex);
  const prediction = model.predict(tf.tensor2d([healthIndex], [1, 1])).dataSync()[0];
  res.json({ threatened: prediction > 0.5 });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
