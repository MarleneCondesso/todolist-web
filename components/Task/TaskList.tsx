import { FC, useCallback, useMemo, useState } from "react";
import Item from "./Item";



interface TaskListProps {
  data: Record<string, any>[];
  openTasks: boolean
}

const TaskList: FC<TaskListProps> = ({ data, openTasks }) => {
  


  return (
    <div className="h-full w-full rounded-3xl p-5 pt-10">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-row justify-between p-4">
          <p>{" "}</p>
          <div className='
            bg-slate-300
            bg-opacity-80 
            h-10 
            w-10 
            items-center 
            flex 
            justify-center 
            rounded-full 
            text-slate-800
            dark:bg-slate-500
            dark:text-teal-400'
          >
            {data?.length}
          </div>
        </div>
        {data?.length === 0 ? 
          <div className="w-full h-full dark:bg-slate-500 bg-slate-400 shadow-xl bg-opacity-80 p-12 rounded-2xl">
            <div className="flex flex-col items-center justify-center p-10">
              <h1 className="dark:text-white text-slate-700 font-semibold text-4xl">THIS IS YOUR TASKS LIST</h1>
              <img src="/images/this-is-your-list.jpg" alt="empty-list" className="rounded-2xl hover:scale-150 my-10 w-[400px] peer"/>
              <h3 className="dark:text-white text-slate-700 font-semibold text-4xl  peer-hover:hidden">{`Please, let's do SOME WORK and ${openTasks ? 'ADD NEW' : 'CLOSE SOME'} Tasks!`}</h3>
            </div>
          </div>  
          :
        <div className=" lg:grid-cols-3  grid gap-10 h-90 w-full overflow-x-hidden p-4 items-center justify-center">
          {data?.map((task: any) => (
            <Item key={task.id} item={task}/>
          ))}
        </div>
        }
      </div>
    </div>
  );
}

export default TaskList;