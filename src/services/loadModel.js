const tf = require("@tensorflow/tfjs-node");
const path = require("path");
async function loadModel() {
  return tf.loadGraphModel(
    "https://storage.googleapis.com/bucket-model-aden/model-in-prod/model.json"
  );
}
module.exports = loadModel;
