import React from 'react';
import Webcam from 'react-webcam';

export default function Status({
  webcamRef,
  fps,
}: {
  webcamRef: React.MutableRefObject<Webcam | null>;
  fps: number;
}) {
  return webcamRef && webcamRef.current ? (
    <>
      <div className="absolute right-3 top-3 z-50 flex flex-row items-center gap-2 rounded-full bg-white/90 px-1.5 py-1 text-[0.65rem]">
        <div className="pt-[1px]">
          {webcamRef.current.video?.offsetHeight}*
          {webcamRef.current.video?.offsetWidth}
        </div>
        <div className="w-[2.5rem] pt-[1px] text-center">{fps}fps</div>

        <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
      </div>
    </>
  ) : (
    <div />
  );
}
