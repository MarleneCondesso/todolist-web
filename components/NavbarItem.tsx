import { FC } from "react";

interface NavbarItemProps{
    to: string;
    label: string;
    showBackground?: boolean;
    onClick?: () => void;
}

const NavbarItem: FC<NavbarItemProps> = ({
    to,
    label,
    showBackground,
    onClick
}) => {

    return(
            <div>
                <a href={to} onClick={onClick} className={`
                ${!showBackground && 'lg:text-slate-500'}
                text-slate-700
                hover:text-black
                dark:lg:text-teal-200
                dark:hover:text-white
                dark:text-teal-400
                hover:underline
                focus:underline
                focus:underline-offset-8
                underline-offset-8 
                items-center 
                justify-center 
                flex 
                lg:px-0 
                font-semibold 
                cursor-pointer 
                transition-shadow
                lg:z-[1]`}>
                    {label}
                </a> 
            </div>
    );
}

export default NavbarItem;