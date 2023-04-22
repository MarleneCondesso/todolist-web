import { FC, useCallback, useMemo, useState } from "react";
import Item from "./Item";



interface TaskListProps {
  data: Record<string, any>[];
}

const TaskList: FC<TaskListProps> = ({ data }) => {
  console.log(data);


  return (
    <div className="bg-slate-700 h-full w-full bg-opacity-50 rounded-3xl p-5">
      <div className="">
        <div className="flex flex-row justify-between p-4">
          <p>{" "}</p>
          <div className='
            bg-slate-700 
            bg-opacity-80 
            h-10 
            w-10 
            items-center 
            flex 
            justify-center 
            rounded-full 
            text-white'
          >
            {data?.length}
          </div>
        </div>
        <ul className="flex flex-col overflow-auto h-[300px] dark:bg-slate-700 rounded overflow-x-hidden dark:scrollbar-track-teal-500 dark:scrollbar-thumb-slate-600 scrollbar-thumb-rounded-lg scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-gray-500">
          {data?.map((task: any) => (
            <li key={task.id}>
              <Item item={task}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;