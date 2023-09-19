import { BiTask } from 'react-icons/bi';
import { FC, useCallback, useState } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import axios from 'axios';
import useTask from '@/hooks/useTask';
import moment from 'moment';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { CgCloseR } from 'react-icons/cg';
import { MdOutlineCheckBox } from 'react-icons/md';
import useTaskListClosed from '@/hooks/useTaskListClosed';
import ReactCardFlip from 'react-card-flip';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';


interface ItemProps {
    item: any;
}

const Item: FC<ItemProps> = ({
    item
}) => {

    const { mutate: mutateTasks } = useTask();
    const { mutate: mutateTasksClosed } = useTaskListClosed();


    const { data: currentUser, mutate } = useCurrentUser();


    const [isFlipped, setIsFlipped] = useState(false);
    const [updateValue, setUpdateValue] = useState(false);
    const [value, setvalue] = useState('');


    const deleteSelectedTask = useCallback(async () => {
        const taskId = item.id;
        let response = await axios.post('/api/task/delete', { taskId });

        const updateTaskIds = response?.data?.taskIds;

        mutate({
            ...currentUser,
            taskIds: updateTaskIds
        });
        mutateTasks();
        mutateTasksClosed();
    }, [currentUser, item.id, mutate, mutateTasks, mutateTasksClosed]);


    const checkSelectedTask = useCallback(async () => {
        const taskId = item.id;
        const state = true;
        await axios.put('/api/task/putState', { taskId, state });
       


        mutateTasks();
        mutateTasksClosed();
    }, [item.id, mutateTasks, mutateTasksClosed]);

    const updateSelectedTask = useCallback(async () => {
        if(!value)return alert('The field is empty!')
        const taskId = item.id;
        const text = value;
        await axios.put('/api/task/putText', { taskId, text });

       


        mutateTasks();
        mutateTasksClosed();
    }, [item.id, mutateTasks, mutateTasksClosed, value]);


    const toggleFlipped = useCallback(() => {
        setIsFlipped((currentVariant) => !currentVariant);
    }, []);

    const toggleUpdateValue = useCallback(() => {
        setUpdateValue((currentVariant) => !currentVariant);
    }, []);



    const createdAt = moment(item?.createdAt).format('DD-MM-YYYY');
    const updateAt = moment(item?.updateAt).format('DD-MM-YYYY');
    const createdTime = moment(item?.createdAt).format('HH:mm:ss');
    const updateTime = moment(item?.updateAt).format('HH:mm:ss');

    return (
        <ReactCardFlip isFlipped={isFlipped} >
        <div className="h-72 w-72 dark:bg-slate-500 bg-slate-300 shadow-xl p-6 rounded-xl">

            <div className="gap-8 flex flex-col items-center justify-center text-justify text-sm h-full">
                {updateValue ? 
                <input 
                id={"task"}
                value={value}
                type="text"
                onChange={(ev: any) => { setvalue(ev.target.value) }} 
                className="
                    block
                    rounded-md
                    pb-1
                    w-48
                    h-8
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
                placeholder={item.text}
                />
                : 
                <p className="dark:text-white  text-slate-700">
                    {item?.text}
                </p>}
                {!item?.state ?
                    <div className='flex items-center justify-end gap-8 dark:text-teal-400 text-slate-700'>
                        {updateValue ? 
                        <>
                            <MdOutlineCheckBox color='#15803d' className="cursor-pointer" size={22} onClick={() => {toggleUpdateValue(); updateSelectedTask(); }}/>
                            <CgCloseR color='#991b1b' className="cursor-pointer" size={20} onClick={()=> {toggleUpdateValue(); setvalue('');}}/>
                        </>
                        :
                        <>
                            <HiOutlinePencilAlt className="cursor-pointer" onClick={toggleUpdateValue} size={20}/>
                            <BiTask className="cursor-pointer" onClick={checkSelectedTask} size={20} />
                            <AiOutlineDelete className="cursor-pointer" onClick={deleteSelectedTask} size={20} />
                        </>
                        }       
                        
                    </div>
                    :
                    null
                }

            </div>
            <div className='flex justify-end text-sm items-center pb-4 gap-4 text-slate-700 dark:text-white cursor-pointer' onClick={toggleFlipped}>
                <div className='text-xs font-bold' onClick={toggleFlipped}>More info</div>
                <MdKeyboardDoubleArrowRight onClick={toggleFlipped}/>
            </div>
        </div>
        <div className="h-72 w-72 dark:bg-slate-600 bg-slate-400 shadow-xl p-6 rounded-2xl">

            <div className="gap-8 flex flex-col text-xs items-center h-full">
                
                <p className='font-semibold text-base dark:text-teal-400 text-white'>Created At: </p>
                <div className="dark:text-white text-slate-700 flex flex-row gap-5">
                    <p>{createdAt}</p>
                    <p>{createdTime}</p>
                </div>
                <p className='font-semibold text-base dark:text-teal-400 text-white'>Closed At: </p>
                <div className="dark:text-white text-slate-700 flex flex-row gap-5">
                    <p>{updateAt}</p>
                    <p>{updateTime}</p>
                </div>
                
            </div>
            <div className='flex justify-end text-sm items-center pb-4 gap-4 text-slate-700 dark:text-teal-400 cursor-pointer' onClick={toggleFlipped}>
                <div className='text-xs font-bold' onClick={toggleFlipped}>Less info</div>
                    <MdKeyboardDoubleArrowRight onClick={toggleFlipped}/>
                </div>
            </div>
           
        </ReactCardFlip> 
    );
}

export default Item;