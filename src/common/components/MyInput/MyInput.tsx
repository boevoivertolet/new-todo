import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyInput.module.scss'
import TextField from "@mui/material/TextField";
import {createTheme, styled, ThemeProvider} from "@mui/material";

export const MyInput: React.FC<MyInputProps> = (props) => {
    const {callBack, value, onEnterKeyCallBack, placeholder, error, blurCallBack, style, ...restProps} = props

    const onChangeCallBackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.value)
    }
    const onEnterKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onEnterKeyCallBack(e.key)
        }
    }

    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            backgroundColor: 'transparent',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: '#26CBFC',
                                borderWidth: '1px',
                            }
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: '#26CBFC',
                            borderWidth: '1px',
                        }
                    },
                },
            },
        },
    });


    return (
        <ThemeProvider theme = {theme}>
            <TextField error = {!!error} id = "outlined-basic" label = {error ? error : placeholder} variant = "outlined"
                       size = {'small'} className = {error ? s.error : s.input} type = {'text'}
                       onBlur = {blurCallBack}
                       onChange = {onChangeCallBackHandler}
                       onKeyDown = {onEnterKeyHandler} value = {value} autoFocus />
        </ThemeProvider>

    );
};

type MyInputProps = {
    error?: string | null
    callBack: (value: string) => void
    value: string
    onEnterKeyCallBack: (key: string) => void
    placeholder?: string
    blurCallBack?: () => void
    style?: {}
}
