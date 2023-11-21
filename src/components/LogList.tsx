import React from 'react';
import { LogData } from '../type';
import { Trash } from '@phosphor-icons/react';
import { initLogData } from '../data';

export default function LogList({
  log,
  setLog,
  height,
}: {
  log: LogData;
  setLog: React.Dispatch<React.SetStateAction<LogData>>;
  height: number;
}) {
  return (
    <div
      className={`h-auto w-52 overflow-hidden rounded-2xl bg-zinc-100 px-2 py-4`}
      style={{ height: height }}
    >
      <div className="mb-1 flex flex-row items-center justify-between border-b pb-1">
        <div className="flex gap-2 text-xs">
          <div>차종</div>
          <div className="rounded-md bg-zinc-800 px-2 text-white">
            {log.list.length}
          </div>
        </div>
        <div
          className="cursor-pointer rounded-md px-2 py-[4px] hover:bg-zinc-700/20"
          onClick={() => setLog(initLogData)}
        >
          <Trash size={18} weight="light" />
        </div>
      </div>

      <div className="h-full overflow-x-scroll text-xs">
        {!log || log.list.length === 0 ? (
          <div className="break-words pt-20 text-center">
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
    </div>
  );
}
