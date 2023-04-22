import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";



const Navbar = () => {

    const { data: currentUser } = useCurrentUser();


    console.log();


    return (
        <div className="w-full">
            <div className="flex flex-row items-center justify-start w-full gap-10 h-40">
                <img src={currentUser?.image} alt="" className=" h-16 w-16 rounded-full"></img> 
                <div className="flex flex-row justify-between w-full">
                    <h2 className="text-slate-700 dark:text-teal-400 font-semibold text-2xl">{currentUser?.name}</h2>
                    <button onClick={() => signOut()} className="text-slate-700 font-semibold bg-slate-400 h-12 w-24 rounded-lg">Sign Out</button>
                </div>   
                
            </div>
        </div>
    );
}

export default Navbar;