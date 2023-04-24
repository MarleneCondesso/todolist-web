import bcrypt from 'bcrypt';
import { NextApiResponse, NextApiRequest } from 'next';
import { without } from "lodash";
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse){


    try{


        if(req.method === 'PUT'){

                      
            
            const { taskId, state} = req.body



            const existingTask = await prismadb.task.findUnique({
                where: {
                    id: taskId || '',
                }
            });


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
            
            return res.status(200).json(updateTask);
        }

    }catch(error){
        return res.status(400).end();
    }
}