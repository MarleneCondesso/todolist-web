import Input from "@/components/Task/Input";
import Item from "@/components/Task/Item";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import register from "./api/register";
import { TaskDTO, TaskService } from "@/services/TaskService";
import TaskList from "@/components/Task/TaskList";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import useTask from "@/hooks/useTask";
import useTaskListClosed from "@/hooks/useTaskListClosed";
import Navbar from "@/components/Navbar";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}


export default function Home() {

  const [input, setInput] = useState('');

  // const [ tasksUsers, setTasksUser ] = useState<Task[]>([]);


  const { data: taskList = [] } = useTask();
  const { data: taskListClosed = [] } = useTaskListClosed();

  const { mutate: mutateTasks } = useTask();
  const { data: currentUser, mutate } = useCurrentUser();


  const [showTaskListClosed, setShowTaskListClosed] = useState(false);

  const addNewTask = useCallback(async () => {

    let state = false;
    let text = input;
    let response = await axios.post('/api/post', { text, state });
    console.log(response);
    const updateTaskIds = response?.data?.taskIds;

    mutate({
      ...currentUser,
      taskIds: updateTaskIds
    });
    mutateTasks();
  }, [input, currentUser, mutate, mutateTasks]);


  const toggleVariant = useCallback(() => {
    setShowTaskListClosed((currentVariant) => !currentVariant);
  }, []);



  return (
    <>
      <div className='
      p-10
      h-full 
      w-full 
      flex 
      items-center 
      justify-center 
      flex-col
      gap-5'
      >
        <Navbar />
        <div className="
        flex 
        flex-row 
        w-full 
        justify-center 
        gap-10 
        bg-slate-700 
        bg-opacity-90  
        items-center 
        rounded-md
        h-60">
          <button onClick={toggleVariant} className="
            bg-slate-700 
            w-20
            h-10 
            rounded-lg 
            text-white 
            dark:bg-slate-600 
            dark:text-teal-500
            hover:text-slate-700
            hover:bg-slate-400
            dark:hover:bg-teal-400
            dark:hover:text-white"
          >{showTaskListClosed ? 'TO DO' : 'CLOSED'}</button>
          <Input id="task" label="Insert your task" onChange={(ev: any) => { setInput(ev.target.value) }} value={input} type="text" />
          <button onClick={addNewTask} className="
          bg-slate-700 
          w-20 
          h-10
          rounded-lg 
          text-white 
          dark:bg-slate-600 
          dark:text-teal-500
          hover:text-slate-700
          hover:bg-slate-400
          dark:hover:bg-teal-400
          dark:hover:text-white
          ">ADD</button>
        </div>
        <TaskList data={showTaskListClosed ? taskListClosed : taskList} />
      </div>
    </>
  )
}
