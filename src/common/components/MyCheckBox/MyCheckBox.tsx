import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";


export const MyCheckBox: React.FC<MyCheckBoxProps> = (props) => {
    const {callBack, checked, style, ...restProps} = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)

    }


    return (
        // <input style={style} type={'checkbox'} checked = {checked} onChange = {onChangeHandler} />
         <Checkbox style = {style} checked = {checked} onChange = {onChangeHandler} />


)
    ;
};

type MyCheckBoxProps = {
    checked: boolean
    callBack: (checked: boolean) => void
    style?: {}

}
