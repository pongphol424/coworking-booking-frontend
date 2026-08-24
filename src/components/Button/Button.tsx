import type { ButtonHTMLAttributes} from 'react';
import styles from "./Button.module.css"


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    buttonstyle: string
}


export function Button({buttonstyle, type, children, ...buttonProps}: ButtonProps){
    const className = styles[buttonstyle]
    return <button className={className} type={type} {...buttonProps}>{children}</button>
}




