import bcrypt from 'bcrypt';
import { NextApiResponse, NextApiRequest } from 'next';
import { without } from "lodash";
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse){


    try{


        if(req.method === 'POST'){

            console.log("entrou qui");
            const { currentUser } = await serverAuth(req, res);
            
            
            const { taskId } = req.body

            console.log(taskId, 'taskId');
            const existingTask = await prismadb.task.findUnique({
                where: {
                    id: taskId || '',
                }
            });

            console.log( 'existing task', existingTask);
            if (!existingTask) {
                throw new Error('Invalid ID');
            }

            const tasks = await prismadb.task.findMany();

            const updateTasks = without(tasks, existingTask); 
            console.log( 'update tasks', updateTasks);



            const upadateTaskList = await prismadb.task.delete({
                where: {
                    id: taskId,
                },
            });



            console.log( 'update all tasks', upadateTaskList);
            

            const updateTaskIdsUser = without(currentUser.taskIds, taskId); 

            const updateUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '', 
                }, 
                data: {
                    taskIds: updateTaskIdsUser
                }
            });
            console.log('updateUser', updateUser);
            return res.status(200).json(updateUser);
        }

    }catch(error){
        console.log(error);
        console.log("fodasse", req.body)
        return res.status(400).end();
    }
}