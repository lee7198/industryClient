import * as tf from "@tensorflow/tfjs";

export default async function Detect() {
  const model = await tf.loadLayersModel(
    "https://foo.bar/tfjs_artifacts/model.json"
  );
  const example = tf.fromPixels(webcamElement); // for example
  const prediction = model.predict(example);
  return <div>Detect</div>;
}
