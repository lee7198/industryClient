import { Trash, X } from '@phosphor-icons/react';
import React, { useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogData } from '../type';
import { initLogData } from '../data';
import useWindowSize from '../hooks/useWindowSize';

export default function LogListMobile({
  log,
  setLog,
  setOpenModal,
}: {
  log: LogData;
  setLog: React.Dispatch<React.SetStateAction<LogData>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const screen = useWindowSize();

  return screen.width < screen.height ? (
    <motion.div
      key="modal"
      initial={{ translateX: '100%' }}
      animate={{ translateX: 0 }}
      exit={{ translateX: '100%' }}
      transition={{ duration: 0.2 }}
      className="fixed right-0 top-0 z-50 h-[100svh] w-full bg-white px-4"
    >
      <div className="flex w-full justify-end gap-5 pt-10">
        <div className="cursor-pointer" onClick={() => setLog(initLogData)}>
          <Trash size={28} weight="light" />
        </div>
        <div className="cursor-pointer" onClick={() => setOpenModal(false)}>
          <X size={28} weight="light" />
        </div>
      </div>

      <div className="flex gap-2 pb-2">
        <div>차종</div>
        <div className="rounded-md bg-zinc-800 px-2 text-white">
          {log.list.length}
        </div>
      </div>
      <div className="">
        {!log || log.list.length === 0 ? (
          <div className="pt-20 text-center">
            발견한 차량이 존재하지 않습니다. 🚙
          </div>
        ) : (
          log.list.map((item) => (
            <div key={item} className="font-light">
              {item}
            </div>
          ))
        )}
      </div>
    </motion.div>
  ) : (
    <div>hello</div>
  );
}
