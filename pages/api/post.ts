import bcrypt from 'bcrypt';
import { NextApiResponse, NextApiRequest } from 'next';
import { without } from "lodash";
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse){


    try{


        if(req.method === 'POST'){

            const { currentUser } = await serverAuth(req, res);
            
            const { text, state } = req.body

            console.log(text);

            const task = await prismadb.task.create({
                data: {
                    text,
                    state,
                }
            });

            console.log(task);

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || '', 
                }, 
                data: {
                    taskIds: {
                        push: task.id
                    }
                }
            });

            return res.status(200).json(user);

        }

    }catch(error){
        console.log(error);
        console.log("fodasse", req.body)
        return res.status(400).end();
    }
}