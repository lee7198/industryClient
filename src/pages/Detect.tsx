import React, { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
// @ts-ignore-error
import { detectVideo } from '../utils/detection';
import ProgressBar from '../components/ProgressBar';
import FooterNav from '../components/FooterNav';
import { initLogData, models } from '../data';
import LogListMobile from '../components/LogListMobile';
import { AnimatePresence } from 'framer-motion';
import { LogData } from '../type.d';
import Status from '../components/Status';
import useWindowSize from '../hooks/useWindowSize';
import LogList from '../components/LogList';
import Loading from '../components/Loading';

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

export default function Detect() {
  const [detecting, setDetecting] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
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
  const [log, setLog] = useState<LogData>(initLogData);
  const [fps, setFps] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const screen = useWindowSize();

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

    handleCameraSwitch();
  };

  const detectRun = () => {
    if (model.net && webcamRef.current && canvasRef.current) {
      detectVideo(
        webcamRef.current['video'],
        model.net,
        canvasRef.current,
        setLog,
        setFps,
      );
      setDetecting(true);
    }
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

  return model.net ? (
    <>
      <div className="flex h-[100svh] w-full touch-none flex-row items-center justify-center gap-4 overflow-x-scroll sm:px-10">
        <div
          className="relative flex flex-col items-center justify-center pb-10 sm:pb-0"
          ref={contentRef}
        >
          <div
            className={`relative aspect-[0.75] bg-zinc-200 sm:aspect-[1.3333]  sm:max-w-[75vw] sm:rounded-2xl xl:max-w-[50vw] ${
              !webcamRef.current ? 'animate-pulse' : ''
            }`}
          >
            {webcamRef && webcamRef.current && (
              <Status webcamRef={webcamRef} fps={fps} />
            )}
            <Webcam
              className="relative aspect-[0.75] w-full object-cover sm:aspect-[1.3333] sm:max-w-[75vw] sm:rounded-2xl xl:max-w-[50vw] "
              videoConstraints={videoConstraints}
              onPlay={detectRun}
              ref={webcamRef}
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
            setOpenModal={setOpenModal}
            indexControl={{
              modelIndex: modelIndex,
              setModelIndex: setModelIndex,
            }}
            log={log}
          />
        </div>

        {screen.width > screen.height ? (
          fps ? (
            <LogList log={log} setLog={setLog} contentRef={contentRef} />
          ) : (
            <div className="flex w-52 justify-center">
              <Loading />
            </div>
          )
        ) : (
          <AnimatePresence mode="wait">
            {openModal && (
              <LogListMobile
                log={log}
                setLog={setLog}
                setOpenModal={setOpenModal}
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  ) : (
    <div className="flex h-[100svh] w-full items-center justify-center">
      <Loading />
    </div>
  );
}
