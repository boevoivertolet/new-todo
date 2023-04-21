import React from "react";
import s from './MyButton.module.scss'

export const MyButton: React.FC<MyButtonProps> = (props) => {
    const {callBack, title, disabled, children, ...restProps} = props

    const onClickHandler = () => {
        callBack()
    }
    return (
        <button className = {s.btn} onClick = {onClickHandler} disabled = {disabled}>{children}</button>
    );
};


type MyButtonProps = {
    callBack: () => void
    disabled?: boolean
    children?: React.ReactNode
    title?: string
}
