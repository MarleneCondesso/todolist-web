import Input from "@/components/Auth/Input";
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";

import { BsFillMoonFill, BsFillSunFill } from "react-icons/Bs";
import { MdDesktopWindows } from "react-icons/md";

const images = [
    '/images/profile-user-cat.png',
    '/images/profile-user-cat2.jpg',
    '/images/profile-user-meme.png',
    '/images/profile-user-mr.jpg',
    '/images/profile-user-sapo.png',
  ]

const Auth = () => {


    const router = useRouter();

    const [theme, setTheme] = useState(typeof window !== 'undefined' && localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system');

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((current) => current == 'login' ? 'register' : 'login');
    }, []);

    const login = useCallback(async () => {

        try {

            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            })

            router.push('/');
        } catch (error) {
        }
    }, [email, password, router]);


    const register = useCallback(async () => {

        const image = images[Math.floor(Math.random() * 5)];

        try {
            await axios.post('/api/register', {
                email,
                name,
                password,
                image,
            });


            login();
        } catch (error) {
        }
    }, [email, name, password, login]);

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



    return (
        <div className="
        relative
        h-full
        w-full
        bg-cover
        ">
            <div className="flex flex-row justify-end w-full fixed p-4">
                <div className={`
                flex
                bg-gray-400
                opacity-60
                max-lg:top-5
                max-lg:right-20
                self-center
                max-h-10
                p-2
                dark:bg-teal-800
                dark:bg-opacity-60
                rounded-xl
                duration-300
                gap-4`}
                >
                    <button onClick={() => { setTheme('light'); }}>
                        <BsFillSunFill size={20} />
                    </button>
                    <button onClick={() => { setTheme('dark'); }} className={`${theme === 'dark' ? 'text-teal-500' : 'text-white'} dark:hover:text-teal-500 hover:text-teal-900 cursor-pointer`}
                    >
                        <BsFillMoonFill size={18} />
                    </button>
                    <button onClick={() => { setTheme('system'); }}
                        className={`
                        ${theme === 'dark' ? 'text-teal-500' : 'text-white'} hover:text-teal-900 dark:hover:text-teal-500 cursor-pointer  
                    `}
                    >
                        <MdDesktopWindows size={20} />
                    </button>
                </div>
            </div>
            <div className="
            w-full
            h-full
            lg:bg-opacity-50">
                <div className="flex justify-center">
                    <div className="bg-slate-300 
                    dark:bg-slate-600
                    shadow-2xl
                    bg-opacity-70 
                    px-16 
                    py-16 
                    self-center 
                    mt-5 
                    lg:w-2/5 
                    lg:max-w-md 
                    rounded-md 
                    w-full">
                        <h2 className="text-4xl mb-8 font-semibold dark:text-white text-slate-700">
                            {variant == 'login' ? 'Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant == 'register' && (
                                <Input
                                    label="UserName"
                                    onChange={(ev: any) => { setName(ev.target.value) }}
                                    id="name"
                                    value={name} />
                            )}
                            <Input
                                label="Email"
                                onChange={(ev: any) => { setEmail(ev.target.value) }}
                                id="email"
                                type="email"
                                value={email} />
                            <Input
                                label="Password"
                                onChange={(ev: any) => { setPassword(ev.target.value) }}
                                id="password"
                                type="password"
                                value={password} />
                        </div>
                        <button onClick={variant == 'login' ? login : register} className="
                        bg-slate-400
                        py-3
                        rounded-md
                        w-full
                        mt-10
                        text-slate-700 
                        dark:bg-slate-700 
                        dark:text-teal-500
                        hover:text-white
                        hover:bg-slate-500
                        dark:hover:bg-teal-400
                        dark:hover:text-white
                        transition">
                            {variant == 'login' ? 'Login' : 'Sign up'}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {variant == 'login' ? 'First time here?' : 'Already have an account?'}
                            <span onClick={toggleVariant}
                                className="text-slate-700 ml-1 hover:underline cursor-pointer dark:text-slate-300">
                                {variant == 'login' ? 'Create an account' : 'Login in'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;