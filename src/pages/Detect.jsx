import * as tf from '@tensorflow/tfjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { detectVideo, detect } from '../utils/detect';

export default function Detect() {
  const [image, setImage] = useState();
  const [emotion, setEmotion] = useState('');
  const imgRef = useRef(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape

  const run = (model) => {
    // detect(imgRef.current, model, canvasRef.current, image);

    if (webcamRef && webcamRef.current) {
      let image;
      image = tf.browser.fromPixels(webcamRef.current.video);
      const x = 640;
      image = tf.image.resizeBilinear(image, [x, x]);
      image = tf.expandDims(image, 0);

      const prediction = model.execute(image);
      // .executeAsync(image)
      // .then((res) => console.log(res.dataSync()));
      // console.log(prediction);
      if (prediction instanceof tf.Tensor) {
        const predictionArray = prediction.dataSync();

        console.log(
          predictionArray.indexOf(
            predictionArray.reduce((max, v) => (max >= v ? max : v), -Infinity)
          )
        );

        // const maxValue = predictionArray.indexOf(Math.max(...predictionArray));
        // setEmotion(emotionIndex[maxValue]);
      }
      tf.dispose();
    }
  };

  const capture = useCallback(() => {
    if (webcamRef && webcamRef.current)
      setImage(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const init = async () => {
    const model = await tf
      .loadGraphModel('/src/assets/new/model.json')
      .then((res) => {
        console.log('init model' + res.modelUrl);
        setModel({
          net: res,
          inputShape: res.inputs[0].shape,
        });
        return res;
      });

    return model;
  };

  useEffect(() => {
    const model_ = init();

    const detection = setInterval(async () => {
      capture();
      // run(await model_);
    }, 1000);

    return () => {
      clearInterval(detection);
    };
  }, []);

  useEffect(() => {
    console.log(model.net);
  }, [model]);

  return (
    <div className="w-full h-[100svh] flex items-center justify-center flex-col overflow-x-scroll">
      <img
        src={image}
        ref={imgRef}
        width={model.inputShape[1]}
        height={model.inputShape[2]}
      />
      <Webcam
        ref={webcamRef}
        onPlay={() =>
          webcamRef.current &&
          detectVideo(webcamRef.current.video, model, canvasRef.current)
        }
      />
      <canvas
        width={model.inputShape[1]}
        height={model.inputShape[2]}
        ref={canvasRef}
      />
      <div className="text-4xl">{emotion}</div>
    </div>
  );
}
