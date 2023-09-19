import React, { useCallback } from 'react';

import { TbEyeglass, TbEyeglassOff } from 'react-icons/tb';


interface InputProps{
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
    setShowPassword?: (res: any) => void;
}

const Input: React.FC<InputProps> = ({ 
    id,
    onChange,
    value,
    label,
    type, 
    setShowPassword
 }) => {

    const [toggleShowPassword, setToggleShowPassword] = React.useState(false);
    
    const toggleVariant = useCallback(() => {
        debugger
        setToggleShowPassword((current) => {
            setShowPassword!(!current);
            return !current
        });
       
    }, []);


    return (
        <div className="relative">
            <input 
            id={id}
            value={value}
            type={type}
            onChange={onChange}
            className="
                block
                rounded-md
                p-6
                pb-1
                w-full
                text-md
                text-slate-700
                bg-slate-300
                dark:text-teal-400
                dark:bg-slate-800
                appearance-none
                focus:bg-slate-500
                focus:text-slate-200
                dark:focus:bg-slate-700
                focus:outline-none
                focus:ring-0
                peer    
            "
            placeholder=" "
            />
        
            {id === 'password' && 
                !toggleShowPassword ?
                <TbEyeglass size={24} onClick={toggleVariant} className='absolute
                text-md
                text-slate-800
                dark:text-teal-500
                duration-150
                scale-75
                top-4
                z-10
                origin-[0]
                right-6
                cursor-pointer'/> 
            :
            id === 'password' && toggleShowPassword && 
                <TbEyeglassOff size={24} onClick={toggleVariant} className='absolute
                    text-md
                    text-slate-800
                    dark:text-teal-500
                    duration-150
                    scale-75
                    top-4
                    z-10
                    origin-[0]
                    right-6
                    cursor-pointer'/> 
            }
            <label htmlFor={id} 
            className="
            absolute
            text-md
            text-slate-800
            dark:text-teal-500
            duration-150
            transform
            -translate-y-3
            scale-75
            top-4
            z-10
            origin-[0]
            left-6
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-3">
                {label}
            </label>
        </div>
    );
}

export default Input;