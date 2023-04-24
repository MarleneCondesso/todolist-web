import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import Compress from "react-image-file-resizer";

const imageMimeType = /image\/(png|jpg|jpeg)/i;


const NavbarProfile = () => {

    const { data: currentUser, mutate } = useCurrentUser();
    
  //ChangeProfile IMAGE
  const updateImage = useCallback(async (e: any) => {

    let image = e.toString();

    let response = await axios.put('/api/task/putImage', { image });

    mutate({
        ...currentUser,
        image: response?.data?.image
    });


    }, [currentUser, mutate]);


    //Change profile image
    const onFileResize = (e: any) => {
        const file = e.target.files[0];
        
        Compress.imageFileResizer(
        file, // the file from input
        480, // width
        480, // height
        "PNG", // compress format WEBP, JPEG, PNG
        70, // quality
        0, // rotation
        (uri) => {
            updateImage(uri);
            // You upload logic goes here
        },
        "base64" // blob or base64 default base64
        );
    }


    return (
        <>
            <div className="bg-slate-400 dark:bg-slate-700 dark:bg-opacity-80 bg-opacity-60 w-60 absolute top-20 right-0 py-5 flex-col border-2 dark:border-teal-400 border-slate-300 flex rounded-lg">
                <div className="flex flex-col gap-3">
                    <div className="px-3 group/item flex flex-col gap-3 items-center w-full">
                        <div className="w-full h-full">
                            <img className="rounded-md" src={currentUser?.image} alt="profile"/>
                        </div>
                        <input className="cursor-pointer block w-full mb-5 text-xs text-white border border-white rounded-lg bg-slate-700 dark:text-teal-400 focus:outline-none dark:bg-gray-700 dark:border-teal-400 dark:placeholder-teal-400 placeholder-slate-700" accept={"image/*"} id="small_size" onChange={onFileResize} type="file"/>
                        <p className="text-slate-700 dark:text-white text-sm group-hover/item:underline">{currentUser?.name}</p>
                    </div>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-4" />
                <div onClick={() => signOut()} className="px-3 text-center text-slate-700 dark:text-white font-semibold text-sm hover:underline cursor-pointer">
                    Sign out of To Do List
                </div>
            </div>
        </>
    );
}

export default NavbarProfile;