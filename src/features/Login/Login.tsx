import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginStyle = {
    zIndex: '111',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'

}


export const Login = () => {
    return <Grid style = {LoginStyle} container justifyContent = {'center'}>
        <Grid item justifyContent = {'center'}>
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
                    <TextField label = "Email" margin = "normal" />
                    <TextField type = "password" label = "Password"
                               margin = "normal"
                    />
                    <FormControlLabel label = {'Remember me'} control = {<Checkbox />} />
                    <Button type = {'submit'} variant = {'contained'} color = {'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
        </Grid>
    </Grid>
}
