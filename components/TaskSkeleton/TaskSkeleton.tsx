import React from "react";

const TaskSkeleton = () => {
  return (
    <div
      id="task"
      className="flex w-full justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent"
    >
      <div className="inline-flex items-center space-x-2">
        <div className="mr-4">
          <div className="w-6 h-6 bg-slate-300 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col gap-2">
          <div
            className={
              "bg-slate-300 text-lg font-bold h-6 w-28 rounded-md animate-pulse"
            }
          ></div>
          <div
            className={
              "bg-slate-300 text-lg font-bold h-6 w-80 rounded-md animate-pulse"
            }
          ></div>
        </div>
      </div>
      <div>
        <div className="w-6 h-6 bg-slate-300 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default TaskSkeleton;
