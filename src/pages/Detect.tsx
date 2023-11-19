import React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';

// @ts-ignore-error
import { detectVideo } from '../utils/detection';
import Loading from '../components/Loading';

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
    <div className="flex h-[100svh] w-full flex-col items-center justify-center overflow-x-scroll">
      <h1 className="py-4 text-3xl text-zinc-800">
        지역산업 SW인재양성 기반조성사업
      </h1>
      <div className="relative flex items-center justify-center">
        <div
          className={`relative aspect-[1.33333] h-[400px] max-w-[720px] rounded-xl bg-zinc-300 sm:w-full ${
            !webcamRef.current ? 'animate-pulse' : ''
          }`}
        >
          {webcamRef.current ? (
            <div className="absolute right-4 top-4 h-4 w-4 animate-pulse rounded-full bg-green-500" />
          ) : (
            <Loading className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 " />
          )}
          <Webcam
            className="aspect-[1.33333] w-full rounded-xl sm:w-full "
            ref={webcamRef}
            onPlay={detectRun}
          />

          <canvas
            className="absolute left-1/2 top-0 aspect-[1.33333] h-full -translate-x-1/2 sm:w-full"
            width={model.inputShape[1]}
            height={model.inputShape[2]}
            ref={canvasRef}
          />
        </div>
      </div>
    </div>
  );
}
