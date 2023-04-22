import React, {ChangeEvent} from 'react';

export const MyCheckBox: React.FC<MyCheckBoxProps> = (props) => {
    const {callBack, checked, ...restProps} = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)

    }


    return (
        <input type={'checkbox'} checked = {checked} onChange = {onChangeHandler} />
    );
};

type MyCheckBoxProps = {
    checked: boolean
    callBack: (checked: boolean ) => void

}
