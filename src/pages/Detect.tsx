
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs-core';
import * as tflite from '@tensorflow/tfjs-tflite';

export default function Detect() {
  const [image, setImage] = useState<string | null>();
  const [emotion, setEmotion] = useState<string>('');
  const webcamRef = useRef<Webcam>(null);

  const loadModel = async () => {
    const tfliteModel = await tflite.loadTFLiteModel(
      'best_float32.tflite'
    );
    return tfliteModel;
  };

  const run = (model:tflite.TFLiteModel) => {
    if (webcamRef && webcamRef.current) {
      let image;
      image = tf.browser.fromPixels(
        webcamRef.current?.video as HTMLVideoElement
      );
      image = tf.image.resizeBilinear(image, [64, 64]);
      image = tf.expandDims(image, 0);


      let outputTensor = model.predict(image) as tf.Tensor;
      console.log(outputTensor.dataSync());
    }
  }

  // keras model
  // const run = (model: tf.LayersModel) => {
    // if (webcamRef && webcamRef.current) {
    //   let image;
    //   image = tf.browser.fromPixels(
    //     webcamRef.current?.video as HTMLVideoElement
    //   );
    //   image = tf.image.resizeBilinear(image, [64, 64]);
    //   image = tf.expandDims(image, 0);

    //   const prediction = model.predict(image);
    //   if (prediction instanceof tf.Tensor) {
    //     const predictionArray = prediction.dataSync();

    //     const maxValue = predictionArray.indexOf(Math.max(...predictionArray));
    //     console.log(predictionArray);
    //     setEmotion(emotionIndex[maxValue]);
    //   }
    // }
  // };

  const capture = useCallback(() => {
    if (webcamRef && webcamRef.current)
      setImage(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  // const init = async () => {
  //   const model = await tf.loadLayersModel('/src/assets/model/model.json');
  //   return model;
  // };

  useEffect(() => {
    // const model = init();
    const model = loadModel();
    const detection = setInterval(async () => {
      capture();
      run(await model);
    }, 100);

    return () => {
      clearInterval(detection);
    };
  }, []);

  return (
    <div className="w-full h-[100svh] flex items-center justify-center flex-col">
      <Webcam ref={webcamRef} />
      <div className="text-4xl">{emotion}</div>
    </div>
  );
}
