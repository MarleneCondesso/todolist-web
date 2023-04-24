import { NextApiResponse, NextApiRequest } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse){


    try{


        if(req.method === 'PUT'){

            const { currentUser } = await serverAuth(req, res);
            
            
            const { image } = req.body;

            const existingUser = await prismadb.user.findUnique({
                where: {
                    email: currentUser.email || '',
                }
            });

            
            if (!existingUser) {
                throw new Error('Invalid ID');
            }


            const updateUser = await prismadb.user.update({
                where: {
                    email: existingUser.email || "",
                },
                data: {
                    image: image,
                }
            });
            
            return res.status(200).json(updateUser);
        }

    }catch(error){
        return res.status(400).end();
    }
}