import React from 'react';
import { CameraRotate } from '@phosphor-icons/react';
import { models } from '../data';

export default function FooterNav({
  handleCameraSwitch,
  indexControl,
}: {
  handleCameraSwitch: () => void;
  indexControl: {
    modelIndex: number;
    setModelIndex: React.Dispatch<React.SetStateAction<number>>;
  };
}) {
  return (
    <div className="flex w-full items-center justify-around gap-3 p-4">
      <div className="flex items-center gap-1" role="group">
        {models.map((model, idx) => (
          <>
            {idx > 0 && <div className="h-3 w-[1px] bg-zinc-500" />}
            <div
              key={model}
              className={` px-2 py-2 text-xs focus:z-10 focus:text-gray-900 ${
                indexControl.modelIndex === idx
                  ? 'text-gray-900 underline'
                  : 'text-gray-500 '
              } `}
              onClick={() => indexControl.setModelIndex(idx)}
            >
              {model}
            </div>
          </>
        ))}
      </div>
      <div
        onClick={handleCameraSwitch}
        className="transition-all duration-300 ease-in-out active:scale-[90%]"
      >
        <CameraRotate size={28} weight="light" />
      </div>
    </div>
  );
}
