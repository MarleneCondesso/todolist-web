import useCurrentUser from "@/hooks/useCurrentUser";
import { FC, useCallback, useEffect, useState } from "react";
import NavbarMobile from "./NavbarMobile";
import {HiSun } from "react-icons/hi";
import { HiMoon } from "react-icons/hi";
import { MdDesktopWindows } from "react-icons/md";
import { IoIosArrowDown } from 'react-icons/io';
import NavbarProfile from "./NavbarProfile";



interface NavbarProps {
    onTheme: (theme: string) => void;
}

const Navbar: FC<NavbarProps> = ({ onTheme }) => {

    const TOP_OFFSET= 30;
    const { data: currentUser } = useCurrentUser();

    const [theme, setTheme] = useState(typeof window !== 'undefined' && localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system');
    const [variantMenu, setVariantMenu] = useState(false);
    const [showMenuProfile, setShowMenuProfile] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET){
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    },[]);

    useEffect(() => {

        let lasScreenSize = window.innerWidth;

        const handleScreenSize = () => {

            if (lasScreenSize >= 1024) {
                setShowMenuProfile(false);
            }

            lasScreenSize = window.innerWidth;
        }

        window.addEventListener('resize', handleScreenSize);

        return () => {
            window.removeEventListener('resize', handleScreenSize);
        }
    }, []);

    useEffect(() => {
        let lasSrollY = window.scrollY;
        
        const handleScrollY = () => {
            if(lasSrollY >= 30){
                if(window.scrollY >= lasSrollY){
                    setVariantMenu(true);
                } else if(window.scrollY === 0){
                    setVariantMenu(false);
                }else{
                    setVariantMenu(false);
                }
                    setShowMenuProfile(false);
                    lasSrollY = window.scrollY;
            }
        }

        window.addEventListener('scroll', handleScrollY);

        return () => {
            window.removeEventListener('scroll', handleScrollY);
        }
    },[]);
    const onWindowMatch = () => {
        if (typeof window !== 'undefined') {
            let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && darkQuery.matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }

    useEffect(() => {
        switch (theme) {
            case 'dark':
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                break;
            case 'light':
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                break;
            default:
                localStorage.removeItem('theme');
                onWindowMatch();
                break;
        }

    }, [theme]);

    const toggleMenuProfile = useCallback(() => {
        setShowMenuProfile((currentVariant) => !currentVariant);
    }, []);

    return (
        <>
            <nav className={` 
                ${showBackground && 'bg-slate-500 bg-opacity-50 z-[40] transition '}
                ${variantMenu && 'hidden'}
                lg:fixed
                w-full
                flex
                flex-column
                justify-center 
                items-center
                z-[1]
                top-0
                h-20
                `}
            >
                <p className="text-slate-500 dark:text-teal-200 w-full p-3 text-xl font-semibold hidden lg:flex"> TO DO LIST</p>
                <NavbarMobile theme={theme || ''} setTheme={(res) => setTheme(res)} showBackground={showBackground} onClick={() => { }} />
                <div className="flex flex-row justify-end w-full my-10 p-2">
                    <div className={`
                    hidden
                    lg:flex
                    bg-gray-400
                    opacity-60
                    max-lg:top-5
                    max-lg:right-20
                    self-center
                    p-2
                    dark:bg-teal-800
                    dark:bg-opacity-60
                    rounded-xl
                    duration-300
                    gap-4`}
                    >
                        <button onClick={() => { setTheme('light'); onTheme('light'); }}>
                            <HiSun size={20} />
                        </button>
                        <button onClick={() => { setTheme('dark'); onTheme('dark'); }}
                            className={`${theme === 'dark' ? 'text-teal-500' : 'text-white'} dark:hover:text-teal-500 hover:text-teal-900 cursor-pointer`}
                        >
                            <HiMoon size={20} />
                        </button>
                        <button onClick={() => { setTheme('system'); onTheme('system'); }}
                            className={`
                            ${theme === 'dark' ? 'text-teal-500' : 'text-white'} hover:text-teal-900 dark:hover:text-teal-500 cursor-pointer  
                        `}
                        >
                            <MdDesktopWindows size={20} />
                        </button>
                        <div className="flex flex-row items-center gap-3 cursor-pointer transition duration-700" onClick={toggleMenuProfile}>
                        <img src={currentUser?.image} className="w-10" alt="profile-image"/>
                        <IoIosArrowDown size={30} className={`${showMenuProfile && 'rotate-180'} ${theme === 'dark' ? 'text-teal-400' : 'text-slate-700'}`} />
                        </div>
                    </div>
                    {showMenuProfile && <NavbarProfile/>}
                </div>

            </nav>
        </>

    );
}

export default Navbar;


{/* <div className="flex flex-col pl-2 gap-2 cur">
                    <img src={currentUser?.image} alt="" className=" h-16 w-16 rounded-full"></img>
                    
                    <input className=" cursor-pointer block w-full mb-5 text-xs text-white border border-white rounded-lg bg-stone-500 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder-stone-400" accept={"image/*"} id="small_size" onChange={changeHandler} type="file"/>


                </div> */}



