import Input from "@/components/Auth/Input";
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";
import { HiSun } from "react-icons/hi";
import { HiMoon } from "react-icons/hi";
import { MdDesktopWindows } from "react-icons/md";
import { faker } from '@faker-js/faker';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { getMaxListeners } from "process";
import { HtmlContext } from "next/dist/shared/lib/html-context";


const images = [
    '/images/profile-user-cat.png',
    '/images/profile-user-cat2.jpg',
    '/images/profile-user-meme.png',
    '/images/profile-user-mr.jpg',
    '/images/profile-user-sapo.png',
]

//export const generateFakerAvatar = () => faker.image.avatar();

const Auth = () => {


    const router = useRouter();

    const [theme, setTheme] = useState(typeof window !== 'undefined' && localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system');

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [response, setResponse] = useState(true);
    const [responseMessage, setResponseMessage] = useState("");
    const [emailWithoutRequirements, setEmailWithoutRequirements] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((current) => current == 'login' ? 'register' : 'login');
        setResponse(true);
        setResponseMessage('');
    }, []);

    const login = useCallback(async () => {

        if (!verificationValues('login')) return
        try {

            const responsedb = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            });

            setResponse(responsedb?.ok ?? true);
            setResponseMessage(responsedb?.error ?? "Something gone wrong!");
            router.push('/');
        } catch (error) {
        }
    }, [email, password, router]);


    const register = useCallback(async () => {

        //const image = images[Math.floor(Math.random() * 5)];
        const image = faker.image.avatar();

        if (!verificationValues('register')) return
        setEmailWithoutRequirements(false);
        try {
            const responsedb = await axios.post('/api/register', {
                email,
                name,
                password,
                image,
            });
            console.log(responsedb || 'this is supost to have something from the db')
            setResponseMessage("Please, complete all the fields empty's");

            login();
        } catch (error) {
        }
    }, [email, name, password, login]);


    const verificationValues = (type: string) => {
        setEmailWithoutRequirements(false);
        
        const regex = new RegExp('^(?=.*[A-Z])(?=.*[-!@#~|.,$&_?*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8,}$');
       
        if (type === 'login') {
            if (email === '' || password === '') {
                setResponse(false);
                setResponseMessage("Please, complete all the fields empty's");
                return false;
            }
        } else {
            if (email === '' || name === '' || password === '') {
                setResponse(false);
                setResponseMessage("Please, complete all the fields empty's");
                return false;
            }
            debugger


            if (name.length < 3) {
                setResponse(false);
                setResponseMessage("Please, add some letter to your name, it's kinda shorty!");
                return false;
            }

            if (password.length < 8) {
                setResponse(false);
                setResponseMessage("Please, add some characters to your password, it's kinda shorty!");
                return false;
            } else if (!password.match(regex)) {
                setResponse(false);
                setResponseMessage('');
                setEmailWithoutRequirements(true);

                return false;
            }
        }

        if (!(email.includes('@hotmail.pt') || email.includes('@gmail.pt'))) {

            if (!(email.includes('@hotmail.com') || email.includes('@gmail.com'))) {
                setResponse(false);
                setResponseMessage("Please, insert your email correctly. Apparently, you miss something!");
                return false;
            }
            setResponse(true);
            setResponseMessage('');
        }

        return true;
    }

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
                        <HiSun size={20} />
                    </button>
                    <button onClick={() => { setTheme('dark'); }} className={`${theme === 'dark' ? 'text-teal-500' : 'text-white'} dark:hover:text-teal-500 hover:text-teal-900 cursor-pointer`}
                    >
                        <HiMoon size={18} />
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
                                type={showPassword ? '' : 'password'}
                                value={password} 
                                setShowPassword={(res: boolean) => setShowPassword(res)}/>
                        </div>

                        {!response ? <Alert severity="error" className="mt-3">
                            <AlertTitle>Error</AlertTitle>
                            {variant === 'register' && emailWithoutRequirements &&
                                <div>
                                    <strong>
                                        Your password needs to corresponds to:

                                    </strong>
                                    <ul className="pl-10 pt-2 text-sm">
                                        <li className="list-disc">Letters in Upper Case (Min. 1)</li>
                                        <li className="list-disc">Letters in Lower Case (Min. 1)</li>
                                        <li className="list-disc">Numerals (0-9) (Min. 1)</li>
                                        <li className="list-disc">8 characters length</li>
                                        <li className="list-disc">Special Character (!|@#~.,$&?*_-, Min. 1)</li>
                                    </ul>
                                </div>
                            }
                            {responseMessage}
                        </Alert> : null}

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