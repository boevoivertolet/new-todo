import React, { ChangeEvent, KeyboardEvent } from "react";
import s from "./MyInput.module.scss";
import TextField from "@mui/material/TextField";

export const MyInput: React.FC<MyInputProps> = (props) => {
    const { callBack, value, onEnterKeyCallBack, placeholder, error, blurCallBack, disabled, style, ...restProps } =
        props;

    const onChangeCallBackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.value);
    };
    const onEnterKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onEnterKeyCallBack(e.key);
        }
    };

    return (
        <TextField
            error={!!error}
            id="outlined-basic"
            label={error ? error : placeholder}
            variant="outlined"
            size={"small"}
            className={error ? s.error : s.input}
            type={"text"}
            onBlur={blurCallBack}
            onChange={onChangeCallBackHandler}
            onKeyDown={onEnterKeyHandler}
            value={value}
            disabled={disabled}
        />
    );
};

type MyInputProps = {
    disabled?: boolean;
    error?: string | null;
    callBack: (value: string) => void;
    value: string;
    onEnterKeyCallBack: (key: string) => void;
    placeholder?: string;
    blurCallBack?: () => void;
    style?: {};
};
