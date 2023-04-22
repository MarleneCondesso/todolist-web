import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from '@/lib/serverAuth';
import prismadb from '@/lib/prismadb';
export default async function handler(req: NextApiRequest, res: NextApiResponse){

        if(req.method !== 'GET'){
            return res.status(405).end();
        }

        try{
            const { currentUser} = await serverAuth(req, res);

            const tasks = await prismadb.task.findMany({
                where: {
                    id: {
                        in: currentUser?.taskIds,

                    },
                    state: {
                        equals: true,
                    },
                },
            });

            console.log(tasks);
            return res.status(200).json(tasks);

        }catch(error){
            console.log(error);
            return res.status(400).end();
        }
}