import { FiDelete } from 'react-icons/fi';
import { BiTask } from 'react-icons/bi';
import { FC, useCallback, useState } from 'react';
import { Task } from '@/services/TaskService';
import useTaskList from '@/hooks/useTask';
import useCurrentUser from '@/hooks/useCurrentUser';
import axios from 'axios';
import useTask from '@/hooks/useTask';
import moment from 'moment';
import { RxDoubleArrowUp } from 'react-icons/rx';
import useTaskListClosed from '@/hooks/useTaskListClosed';

interface ItemProps {
    item: any;
}

const Item: FC<ItemProps> = ({
    item
}) => {

    const { mutate: mutateTasks } = useTask();
    const { mutate: mutateTasksClosed } = useTaskListClosed();


    const { data: currentUser, mutate } = useCurrentUser();

    const [showInfo, setShowInfo] = useState(false);

    const deleteSelectedTask = useCallback(async () => {
        const taskId = item.id;
        let response = await axios.post('/api/delete', { taskId });

        console.log(response);
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
        let response = await axios.put('/api/put', { taskId, state });

        console.log(response);
        

        mutateTasks();
        mutateTasksClosed();
    }, [item.id, mutateTasks, mutateTasksClosed]);


    const toggleVariant = useCallback(() => {
        setShowInfo((currentVariant) => !currentVariant);
    }, []);



    const createdAt = moment(item?.createdAt).format('DD-MM-YYYY');
    const updateAt = moment(item?.updateAt).format('DD-MM-YYYY');
    const createdTime = moment(item?.createdAt).format('HH:mm:ss');
    const updateTime = moment(item?.updateAt).format('HH:mm:ss');

    return (
        <div className="h-full rounded-xl p-4 flex flex-col gap-2">
            <div className='bg-white h-full p-4 flex flex-col w-full justify-center items-center shadow-lg rounded-xl'>
                <div className='w-full flex flex-row text-slate-700 font-semibold text-lg'>
                    <p className='w-full'>{item?.text}</p>
                    {!item?.state ? 
                        <div className='flex flex-row gap-8 h-5 justify-end dark:text-teal-400 text-slate-700'>
                            <BiTask className="cursor-pointer" onClick={checkSelectedTask} size={20} />
                            <FiDelete className="cursor-pointer" onClick={deleteSelectedTask} size={20} />
                        </div>
                    :
                    null
                    }
                    
                </div>
                <RxDoubleArrowUp onClick={toggleVariant} className={` cursor-pointer h-5 ${showInfo ? 'rotate-0' : 'rotate-180'}`} />
            </div>
            {showInfo ?
                <div className='w-full transition-all duration-700 '>
                    <div className=' bg-slate-800 text-white bg-opacity-70 rounded p-4 flex flex-row justify-between shadow-2xl'>
                        <div className='text-xs flex flex-row gap-4'>
                            <p>Created At:</p>
                            <p>{createdAt}</p>
                            <p>{createdTime}</p>
                        </div>
                        <div className='text-xs flex flex-row gap-4'>
                            <p>Update At:</p>
                            <p>{updateAt}</p>
                            <p>{updateTime}</p>
                        </div>
                    </div>
                </div>
                :
                null}
        </div>
    );
}

export default Item;