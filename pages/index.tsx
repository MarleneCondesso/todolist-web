import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useCallback, useState } from "react";
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

  const { data: taskListOpen = [] } = useTask();
  const { data: taskListClosed = [] } = useTaskListClosed();


  const { mutate: mutateTasks } = useTask();
  const { data: currentUser, mutate } = useCurrentUser();


  const [showTaskListClosed, setShowTaskListClosed] = useState(false);

  const addNewTask = useCallback(async () => {
    if(!input)return alert('The field is empty!')
    
    let state = false;
    let text = input;
    setInput('');
    let response = await axios.post('/api/task/post', { text, state });;
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
      w-full  
      flex-col
      gap-5 
      justify-between'
      >
        <Navbar onTheme={()=>{}}/>
        <div className="
        flex 
        lg:flex-row
        flex-col 
        w-full 
        justify-center 
        gap-10 
        bg-opacity-90  
        items-center 
        rounded-b-md
        h-32
        mt-16">
          <button onClick={toggleVariant} className="
            bg-slate-300
            w-24
            h-14 
            rounded-full 
            font-semibold
            text-slate-700 
            dark:bg-slate-600 
            dark:text-teal-500
            hover:text-white
            hover:bg-slate-400
            dark:hover:bg-teal-400
            dark:hover:text-white
            z-10"
          >{showTaskListClosed ? 'TO DO' : 'CLOSED'}</button>
          {!showTaskListClosed ?
          <>
          <div className="flex flex-row gap-20 items-center justify-center"> 
          <input 
            id={"task"}
            value={input}
            type="text"
            onChange={(ev: any) => { setInput(ev.target.value) }} 
            className="
                block
                rounded-md
                pb-1
                w-96
                h-14
                p-2
                text-md
                text-slate-700
                bg-slate-300
                dark:text-teal-400
                dark:bg-slate-800
                appearance-none
                focus:outline-none
                focus:ring-0
                focus:bg-slate-400
                dark:focus:bg-slate-600
                dark:focus:bg-opacity-80
                peer    
            "
            placeholder="Insert your task"
            />
          </div>
          <button onClick={addNewTask} className="
          bg-slate-300
          w-20 
          h-10
          rounded-full
          font-semibold
          text-slate-700 
          dark:bg-slate-600 
          dark:text-teal-500
          hover:text-white
          hover:bg-slate-400
          dark:hover:bg-teal-400
          dark:hover:text-white
          z-10
          ">ADD</button>
          </>
          :
            null
          }
        </div>
        <TaskList data={showTaskListClosed ? taskListClosed : taskListOpen} openTasks={!showTaskListClosed}/>
      </div>
    </>
  )
}
