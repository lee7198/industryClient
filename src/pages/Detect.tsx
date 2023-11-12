import * as tf from '@tensorflow/tfjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { emotionIndex } from '../data';

export default function Detect() {
  const [image, setImage] = useState<string | null>();
  const [emotion, setEmotion] = useState<string>('');
  const webcamRef = useRef<Webcam>(null);

  const run = (model: tf.LayersModel) => {
    if (webcamRef && webcamRef.current) {
      let image;
      image = tf.browser.fromPixels(
        webcamRef.current?.video as HTMLVideoElement
      );
      image = tf.image.resizeBilinear(image, [64, 64]);
      image = tf.expandDims(image, 0);

      const prediction = model.predict(image);
      if (prediction instanceof tf.Tensor) {
        const predictionArray = prediction.dataSync();

        const maxValue = predictionArray.indexOf(Math.max(...predictionArray));
        console.log(predictionArray);
        setEmotion(emotionIndex[maxValue]);
      }
    }
  };

  const capture = useCallback(() => {
    if (webcamRef && webcamRef.current)
      setImage(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const init = async () => {
    const model = await tf.loadLayersModel('/src/assets/model/model.json');
    return model;
  };

  useEffect(() => {
    const model = init();
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
