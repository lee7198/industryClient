import React from 'react';
import { CameraRotate, ClockCounterClockwise } from '@phosphor-icons/react';
// import { models } from '../data';
import { LogData } from '../type';
import logo from '../assets/images/kmu_logo.jpg';

export default function FooterNav({
  handleCameraSwitch,
  setOpenModal,
  indexControl,
  log,
}: {
  handleCameraSwitch: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  log: LogData;
  indexControl: {
    modelIndex: number;
    setModelIndex: React.Dispatch<React.SetStateAction<number>>;
  };
}) {
  return (
    <div className="flex w-full items-center justify-between gap-3 px-4 py-4 sm:max-w-[75vw] sm:px-0 xl:max-w-[50vw]">
      <div className="flex items-center text-sm">
        <img src={logo} className="w-10" />
        <p className="hidden sm:block sm:text-xs">
          계명대학교 컴퓨터공학과 산학프로젝트
        </p>
      </div>

      <div className="flex flex-row gap-1 sm:gap-4">
        <div
          className="relative block cursor-pointer p-2 md:hidden"
          onClick={() => setOpenModal((prev) => !prev)}
        >
          {log.list.length !== 0 && (
            <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-[#f23041] text-center text-[10px] leading-[16px] text-white">
              {log.list.length}
            </div>
          )}
          <ClockCounterClockwise size={28} weight="light" />
        </div>
        <div
          onClick={handleCameraSwitch}
          className="cursor-pointer p-2 transition-all duration-300 ease-in-out active:scale-[90%]"
        >
          <CameraRotate size={28} weight="light" />
        </div>
      </div>
    </div>
  );
}
