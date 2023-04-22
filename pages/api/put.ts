import bcrypt from 'bcrypt';
import { NextApiResponse, NextApiRequest } from 'next';
import { without } from "lodash";
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse){


    try{


        if(req.method === 'PUT'){

            console.log("entrou qui");
            const { currentUser } = await serverAuth(req, res);
            
            
            const { taskId, state} = req.body

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


            const updateTask = await prismadb.task.update({
                where: {
                    id: taskId,
                },
                data: {
                    state: state
                }
            });



            console.log( 'update all tasks', updateTask);
            
            return res.status(200).json(updateTask);
        }

    }catch(error){
        console.log(error);
        console.log("fodasse", req.body)
        return res.status(400).end();
    }
}