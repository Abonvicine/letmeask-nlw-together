import {ButtonHTMLAttributes} from 'react'
import "../styles/button.scss"

//{...props} operador de spread (estudar depois)
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?:boolean
};

export function Button({isOutlined = false,...props}:ButtonProps){

    return(
        <button className={`button ${isOutlined ? 'outlined': ""}`} {...props}/>
    )
}