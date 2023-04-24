import { IoClose } from "react-icons/Io5";
import NavbarItem from "./NavbarItem";
import { FC, useCallback, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdDesktopWindows } from "react-icons/md";
import { BsFillSunFill } from "react-icons/Bs";
import { BsFillMoonFill } from "react-icons/Bs";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { signOut } from "next-auth/react";
import Compress from "react-image-file-resizer";

interface NavbarMobileProps {
    showBackground: boolean;
    onClick: () => void;
    theme?: string;
    setTheme: (theme: string) => void;

}

const NavbarMobile: FC<NavbarMobileProps> = ({
    showBackground,
    onClick,
    theme,
    setTheme
}) => {

    const [variantMobileMenuContent, setVariantMobileMenuContent] = useState(false);


    const { data: currentUser, mutate } = useCurrentUser();



    const toggleMobileMenu = useCallback(() => {
        setVariantMobileMenuContent((current) => !current);
    }, []);


    useEffect(() => {

        let lasScreenSize = window.innerWidth;

        const handleScreenSize = () => {

            if (lasScreenSize >= 1024) {
                setVariantMobileMenuContent(false);
            }

            lasScreenSize = window.innerWidth;
        }

        window.addEventListener('resize', handleScreenSize);

        return () => {
            window.removeEventListener('resize', handleScreenSize);
        }
    }, []);

    useEffect(() => {

        if (variantMobileMenuContent) {
            document.body.classList.add('overflow-hidden');

        } else {
            document.body.classList.remove('overflow-hidden');
        }


    }, [variantMobileMenuContent]);

    //ChangeProfile IMAGE
    const updateImage = useCallback(async (e: any) => {

        let image = e.toString();

        let response = await axios.put('/api/task/putImage', { image });

        mutate({
            ...currentUser,
            image: response?.data?.image
        });


    }, [currentUser, mutate]);


    const onFileResize = (e: any) => {
        if (!e) return 
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
        <div className={`
                ${!variantMobileMenuContent ?
                'p-6 top-0 fixed right-0 block lg:hidden w-full items-center items-right bg-opacity-50'
                :
                'top-0 fixed lg:hidden right-0 block w-full h-screen z-50 bg-opacity-100 bg-white dark:bg-slate-700'
            }
                ${showBackground && !variantMobileMenuContent ? 'bg-slate-500 text-[#DDD0C8] z-50 opacity-80' : ''}
            `}
        >
            <p className={`lg:hidden gap-4 text-slate-700 dark:text-teal-200 top-6 font-semibold fixed ${variantMobileMenuContent && 'hidden'}`}>
                TO DO LIST
            </p>
            {!variantMobileMenuContent ?
                <div onClick={toggleMobileMenu} className={`
                        cursor-pointer 
                        ${showBackground ? 'text-white dark:text-teal-200 dark:text-opacity-100' : 'text-slate-700 dark:text-teal-200'} 
                        float-right 
                        mr-4`}
                >
                    <FiMenu size={30} />
                </div>
                :
                <div className={`${!variantMobileMenuContent ? 'translate-x-80' : 'translate-x-0'}
                        w-full
                        lg:hidden
                        flex
                        flex-col 
                        gap-10
                        top-0
                        rounded-sm
                        p-3
                        `}
                >

                    <IoClose size={36} className="cursor-pointer text-gray-600 dark:text-teal-400" onClick={toggleMobileMenu} />

                    <img src={currentUser?.image} className="w-16 self-center" alt="profile-image"/>
                    <h2 className="text-slate-700
                        dark:lg:text-teal-200
                        dark:text-teal-400
                        items-center 
                        justify-center 
                        flex 
                        lg:px-0 
                        font-semibold 
                        cursor-pointer 
                        transition-shadow
                        lg:z-[1]`}>"
                    >
                        {currentUser?.name}
                    </h2>
                    <div className="items-center justify-center w-full flex flex-col">
                        <p>Change profile image</p> 
                        <input className="cursor-pointer w-60 mb-5 text-xs text-white border border-white rounded-lg bg-slate-700 dark:text-teal-400 focus:outline-none dark:bg-gray-700 dark:border-teal-400 dark:placeholder-teal-400 placeholder-slate-700" accept={"image/*"} id="small_size" onChange={onFileResize} type="file"/>
                    </div>
                    <NavbarItem to="#" label="Delete Account" onClick={toggleMobileMenu} />
                    <NavbarItem to="#" label="Sign Out" onClick={()=> signOut()} />
                    <div className={`
                            lg:hidden
                            fixed
                            right-4
                            bg-gray-400
                            opacity-60
                            p-2
                            dark:bg-teal-800
                            dark:bg-opacity-60
                            rounded-xl
                            flex
                            duration-300
                            gap-4`}
                    >
                        <button onClick={() => { setTheme('light') }}
                            className={`
                                ${theme === 'light' ? 'text-[#DDD0C8]' : 'text-white'}
                                dark:hover:text-teal-400 
                                cursor-pointer
                            `}
                        >
                            <BsFillSunFill size={20} />
                        </button>
                        <button onClick={() => { setTheme('dark') }}
                            className={`
                                ${theme === 'dark' ? 'text-teal-500' : 'text-white'}
                                dark:hover:text-teal-500 
                                hover:text-teal-900    
                                cursor-pointer
                            `}
                        >
                            <BsFillMoonFill size={18} />
                        </button>
                        <button onClick={() => { setTheme('system') }}
                            className={`
                                    ${theme === 'dark' ? 'text-teal-500' : 'text-white'}
                                    hover:text-teal-900  
                                    dark:hover:text-teal-500
                                    cursor-pointer  
                                `}
                        >
                            <MdDesktopWindows size={20} />
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default NavbarMobile;