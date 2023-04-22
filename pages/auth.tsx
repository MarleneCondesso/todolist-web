import Input from "@/components/Auth/Input";
import { useCallback, useState } from "react";
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const images = [
    '/images/profile-user-cat.png',
    '/images/profile-user-cat2.jpg',
    '/images/profile-user-meme.png',
    '/images/profile-user-mr.jpg',
    '/images/profile-user-sapo.png',
  ]

const Auth = () => {


    const router = useRouter();

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
            console.log(error);
        }
    }, [email, password, router]);


    const register = useCallback(async () => {

        const image = images[Math.floor(Math.random() * 5)];
        console.log(image);
        try {
            await axios.post('/api/register', {
                email,
                name,
                password,
                image,
            });


            login;
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login]);



    return (
        <div className="
        relative
        h-full
        w-full
        bg-cover
        ">
            <div className="
            w-full
            h-full
            lg:bg-opacity-50">
                <div className="flex justify-center">
                    <div className="bg-white 
                    bg-opacity-70 
                    px-16 
                    py-16 
                    self-center 
                    mt-5 
                    lg:w-2/5 
                    lg:max-w-md 
                    rounded-md 
                    w-full">
                        <h2 className="text-4xl mb-8 font-semibold">
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
                        bg-[#c4bcb6] 
                        py-3
                        text-white
                        rounded-md
                        w-full
                        mt-10
                        hover:bg-[#979390]
                        transition">
                            {variant == 'login' ? 'Login' : 'Sign up'}
                        </button>
                        <div className="
                        flex 
                        flex-row
                        items-center
                        gap-4
                        mt-8
                        justify-center">
                            <div onClick={() => signIn('google', { callbackUrl: '/' })}
                                className="
                            w-10
                            h-10
                            bg-white
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            hover:opacity-80
                            transition">
                                <FcGoogle size={30} />
                            </div>
                            <div onClick={() => signIn('github', { callbackUrl: '/' })}
                                className="
                            w-10
                            h-10
                            bg-white
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            hover:opacity-80
                            transition">
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant == 'login' ? 'First time here?' : 'Already have an account?'}
                            <span onClick={toggleVariant}
                                className="text-black ml-1 hover:underline cursor-pointer">
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