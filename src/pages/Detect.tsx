import React, { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
// @ts-ignore-error
import { detectVideo } from '../utils/detection';
import ProgressBar from '../components/ProgressBar';
import FooterNav from '../components/FooterNav';
import { models } from '../data';

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

export default function Detect() {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [model, setModel] = useState<{
    net?: tf.GraphModel<string | tf.io.IOHandler>;
    inputShape: number[];
  }>({
    net: undefined,
    inputShape: [1, 0, 0, 3],
  });
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: FACING_MODE_USER,
  });
  const [modelIndex, setModelIndex] = useState(0);

  const init = async () => {
    const yolo = await tf.loadGraphModel(
      `${window.location.href}/${models[modelIndex]}/model.json`,
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
    if (model.net && webcamRef.current && canvasRef.current)
      detectVideo(webcamRef.current['video'], model.net, canvasRef.current);
  };

  const handleCameraSwitch = useCallback(() => {
    setVideoConstraints((prevState) => ({
      facingMode:
        prevState.facingMode === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER,
    }));
  }, []);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    detectRun();
  }, [model]);

  useEffect(() => {
    init();
  }, [modelIndex]);

  return (
    <div className="flex h-[100svh] w-full touch-none flex-col items-center justify-center overflow-x-scroll">
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <div
          className={`relative aspect-[0.75] w-full bg-zinc-200 ${
            !webcamRef.current ? 'animate-pulse' : ''
          }`}
        >
          {webcamRef.current ? (
            <>
              <div className="absolute right-3 top-3 h-3 w-3 animate-pulse rounded-full bg-green-500" />
              <div className="absolute left-3 top-3 rounded-full bg-white px-2 pt-[1px] text-xs uppercase">
                {models[modelIndex]}
              </div>
            </>
          ) : (
            <ProgressBar className="absolute bottom-[-2px]" />
          )}
          <Webcam
            className="aspect-[0.75] w-full object-cover"
            ref={webcamRef}
            onPlay={detectRun}
            videoConstraints={videoConstraints}
          />

          <canvas
            className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2"
            width={model.inputShape[1]}
            height={model.inputShape[2]}
            ref={canvasRef}
          />
        </div>
        <FooterNav
          handleCameraSwitch={handleCameraSwitch}
          indexControl={{
            modelIndex: modelIndex,
            setModelIndex: setModelIndex,
          }}
        />
      </div>
    </div>
  );
}
