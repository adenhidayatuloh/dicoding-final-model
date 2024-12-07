const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

async function predictClassification(model, image) {
  try {
    imgData = Uint8Array.from(image);
    const tensor = tf.node
      .decodeJpeg(imgData)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const label = confidenceScore <= 50 ? "Non-cancer" : "Cancer";
    let suggestion;

    if (label === "Cancer") {
      suggestion = "Segera periksa ke dokter!";
    }

    if (label === "Non-cancer") {
      suggestion = "Anda sehat!";
    }

    return { label, suggestion };
  } catch (error) {
    throw new InputError(error);
  }
}

module.exports = predictClassification;