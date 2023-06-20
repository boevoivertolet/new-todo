import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useAppDispatch} from "../../app/store";

const LoginStyle = {
    zIndex: '111',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'

}


export const Login = () => {
    const dispatch = useAppDispatch()

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) {
                errors.password = 'Should be three or more symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()

        },
    })


    return <Grid style = {LoginStyle} container justifyContent = {'center'}>
        <Grid item justifyContent = {'center'}>
            <form onSubmit = {formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href = {'https://social-network.samuraijs.com/'}
                               target = {'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            {...formik.getFieldProps('email')}
                            label = {'email'}
                            margin = {'normal'}
                            onChange = {formik.handleChange}
                            value = {formik.values.email}
                            onBlur = {formik.handleBlur} />
                        {formik.touched.email && formik.errors.email ?
                            <div style = {{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            {...formik.getFieldProps('password')}
                            label = {'password'}
                            margin = {'normal'}
                            type = {'password'}
                            onBlur = {formik.handleBlur}
                            onChange = {formik.handleChange}
                            value = {formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style = {{color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel label = {'Remember me'}
                                          control = {<Checkbox name = 'rememberMe' onChange = {formik.handleChange}
                                                               checked = {formik.values.rememberMe} />} />

                        <Button type = {'submit'} variant = {'contained'} color = {'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
