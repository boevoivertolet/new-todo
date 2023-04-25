import React from "react";
import s from './MyButton.module.scss'

export const MyButton: React.FC<MyButtonProps> = (props) => {
    const {callBack, title, disabled, children, active, ...restProps} = props

    const onClickHandler = () => {
        callBack()
    }
    return (
        <button title={title} className = {active ? `${s.btn + ' ' + s.btn__active}` : s.btn} onClick = {onClickHandler}
                disabled = {disabled}>{children}</button>
    );
};


type MyButtonProps = {
    callBack: () => void
    disabled?: boolean
    children?: React.ReactNode
    title?: string
    active?: boolean
}
