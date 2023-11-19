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
    <div className="flex w-full items-center justify-around gap-3 p-4 md:max-w-[1080px]">
      <div className="flex items-center gap-3" role="group">
        {models.map((model, idx) => (
          <React.Fragment key={model}>
            {idx > 0 && <div className="h-3 w-[1px] bg-zinc-500" />}
            <div
              className={`h-4 cursor-pointer text-xs md:text-base ${
                indexControl.modelIndex === idx
                  ? 'bg-zinc-600 text-white'
                  : 'text-gray-500 '
              } `}
              onClick={() => indexControl.setModelIndex(idx)}
            >
              {model}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div
        onClick={handleCameraSwitch}
        className="cursor-pointer transition-all duration-300 ease-in-out active:scale-[90%]"
      >
        <CameraRotate size={28} weight="light" />
      </div>
    </div>
  );
}
