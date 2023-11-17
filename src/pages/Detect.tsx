import React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import { detectVideo } from '../utils/detect';

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
      `${window.location.href}/model/model.json`
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
    <div className="w-full h-[100svh] flex items-center justify-center flex-col overflow-x-scroll bg-[#e0e0e0]">
      <h1 className="text-6xl py-4 text-zinc-800">EMOTY</h1>
      <div className="relative flex justify-center items-center">
        <Webcam
          className="sm:w-full sm:px-4 max-w-[720px] w-3/4 aspect-[1.33333] rounded-xl"
          ref={webcamRef}
          onPlay={detectRun}
        />
        <canvas
          className="sm:w-full sm:px-4 max-w-[720px] aspect-[1.33333] absolute top-0 left-1/2 -translate-x-1/2 w-3/4"
          width={model.inputShape[1]}
          height={model.inputShape[2]}
          ref={canvasRef}
        />
      </div>
    </div>
  );
}
