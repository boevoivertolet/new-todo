import React, { useState } from "react";
import { MyInput } from "../MyInput/MyInput";
import s from "./EditableInput.module.scss";

export const EditableInput: React.FC<EditableInputProps> = React.memo((props) => {
    console.log("render EditableInput");
    const { changeTodolistTitle, disabled, ...restProps } = props;
    const [editMode, setEditMode] = useState<boolean>(false);
    const [value, setValue] = useState(restProps.value);

    const activateEditMod = () => {
        setEditMode(true);
    };

    const deActivateEditMod = () => {
        setEditMode(false);
        changeTodolistTitle(value);
    };

    return (
        <div className={s.editable__input}>
            {!editMode ? (
                <div className={s.editable__div} onDoubleClick={activateEditMod}>
                    {value}
                </div>
            ) : (
                <MyInput
                    disabled={disabled}
                    blurCallBack={deActivateEditMod}
                    callBack={setValue}
                    value={value}
                    onEnterKeyCallBack={deActivateEditMod}
                />
            )}
        </div>
    );
});
type EditableInputProps = {
    disabled?: boolean;
    value: string;
    changeTodolistTitle: (title: string) => void;
};
