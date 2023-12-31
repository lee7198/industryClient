import React, { useState } from 'react';
import { CameraRotate, ClockCounterClockwise, X } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
// import { models } from '../data';
import { LogData } from '../type';
import logo from '../assets/images/kmu_logo.jpg';
import video from '../assets/video/8d426758-39d0-40e8-ba9a-dc75904eeb2a.mp4';

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
  const [modal, setModal] = useState(false);
  return (
    <>
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
          <div className="flex gap-2">
            <div
              onClick={() => setModal(true)}
              className="cursor-pointer p-2 text-xs leading-7 transition-all duration-300 ease-in-out active:scale-[90%]"
            >
              시연
            </div>
            <div
              onClick={handleCameraSwitch}
              className="cursor-pointer p-2 transition-all duration-300 ease-in-out active:scale-[90%]"
            >
              <CameraRotate size={28} weight="light" />
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <AnimatePresence mode="wait">
        {modal && (
          <motion.div
            initial={{ opacity: '0%' }}
            animate={{ opacity: '100%' }}
            exit={{ opacity: '0%' }}
            className="fixed left-0 top-0 z-[99] flex h-[100svh] w-screen items-center justify-center bg-white"
          >
            <video
              className="aspect-[0.4646] h-3/4 overflow-hidden rounded-3xl border-2 border-zinc-200 bg-slate-300 shadow-2xl"
              muted
              autoPlay
              loop
            >
              <source src={video} type="video/mp4" />
            </video>
            <div
              className="absolute right-2 top-4 cursor-pointer p-4 text-sm font-light sm:right-8 sm:top-8"
              onClick={() => setModal((prev) => !prev)}
            >
              <X size={36} weight="light" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
