import {ButtonHTMLAttributes} from 'react'
import "../styles/button.scss"

//{...props} operador de spread (estudar depois)
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props:ButtonProps){

    return(
        <button className="button" {...props}/>
    )
}