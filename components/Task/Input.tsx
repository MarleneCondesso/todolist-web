import React from 'react';

interface InputProps{
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({ 
    id,
    onChange,
    value,
    label,
    type
 }) => {

    return (
        <div className="z-20">
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
                w-96
                text-md
                text-slate-700
                bg-slate-300
                dark:text-teal-400
                dark:bg-slate-800
                appearance-none
                focus:outline-none
                focus:ring-0
                focus:bg-slate-400
                dark:focus:bg-slate-600
                dark:focus:bg-opacity-80
                peer    
            "
            placeholder=" "
            />
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
                peer-focus:-translate-y-3
                ">
                {label}
            </label>
        </div>
    );
}

export default Input;