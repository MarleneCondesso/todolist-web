import bcrypt from 'bcrypt';
import { NextApiResponse, NextApiRequest } from 'next';
import { without } from "lodash";
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse){


    try{


        if(req.method === 'POST'){

            const { currentUser } = await serverAuth(req, res);
            
            
            const { taskId } = req.body

            const existingTask = await prismadb.task.findUnique({
                where: {
                    id: taskId || '',
                }
            });

            if (!existingTask) {
                throw new Error('Invalid ID');
            }

            const tasks = await prismadb.task.findMany();

            const updateTasks = without(tasks, existingTask); 


            const upadateTaskList = await prismadb.task.delete({
                where: {
                    id: taskId,
                },
            });



            

            const updateTaskIdsUser = without(currentUser.taskIds, taskId); 

            const updateUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '', 
                }, 
                data: {
                    taskIds: updateTaskIdsUser
                }
            });
            
            return res.status(200).json(updateUser);
        }

    }catch(error){
        return res.status(400).end();
    }
}