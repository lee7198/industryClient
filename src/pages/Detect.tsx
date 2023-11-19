import React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';

// @ts-ignore-error
import { detectVideo } from '../utils/detection';

export default function Detect() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState<{
    net?: tf.GraphModel<string | tf.io.IOHandler>;
    inputShape: number[];
  }>({
    net: undefined,
    inputShape: [1, 0, 0, 3],
  });

  const init = async () => {
    const yolo = await tf.loadGraphModel(
      `${window.location.href}/model/model.json`,
    );
    if (yolo.inputs[0].shape) {
      // warming up model
      const dummyInput = tf.ones(yolo.inputs[0].shape);
      const warmupResults = yolo.execute(dummyInput);

      setModel({
        net: yolo,
        inputShape: yolo.inputs[0].shape,
      });

      tf.dispose([warmupResults, dummyInput]); // cleanup memory
    }
    return model;
  };

  const detectRun = () => {
    if (model.net && webcamRef.current && canvasRef.current) {
      console.log('detect start');
      detectVideo(webcamRef.current['video'], model.net, canvasRef.current);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log(model.net);
    detectRun();
  }, [model]);

  return (
    <div className="flex h-[100svh] w-full flex-col items-center justify-center overflow-x-scroll bg-[#e0e0e0]">
      <h1 className="py-4 text-3xl text-zinc-800">
        지역산업 SW인재양성 기반조성사업
      </h1>
      <div className="relative flex items-center justify-center">
        <Webcam
          className="aspect-[1.33333] w-3/4 max-w-[720px] rounded-xl sm:w-full sm:px-4"
          ref={webcamRef}
          onPlay={detectRun}
        />
        <canvas
          className="absolute left-1/2 top-0 aspect-[1.33333] w-3/4 max-w-[720px] -translate-x-1/2 sm:w-full sm:px-4"
          width={model.inputShape[1]}
          height={model.inputShape[2]}
          ref={canvasRef}
        />
      </div>
    </div>
  );
}
