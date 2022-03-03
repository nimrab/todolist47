import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import {useFormik} from 'formik'
import {loginTC} from '../../store/auth-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {Navigate} from 'react-router-dom'
import {Button, Grid, FormControl, FormLabel} from '@material-ui/core'

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 6) {
                errors.password = 'Password is minimum 6 symbols required'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        }
    })

    if (isLoggedIn) {
        return <Navigate to='/'/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel style={{marginTop: '10px'}}>
                        <p>Test email: <b>nimrab.0@gmail.com</b></p>
                        <p>Test password: <b>nimrab</b></p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label='Email'
                            margin='normal'
                            {...formik.getFieldProps('email')}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email &&

                        <div style={{color: 'red'}}>{formik.errors.email}</div>}

                        <TextField
                            type='password'
                            label='Password'
                            margin='normal'
                            {...formik.getFieldProps('password')}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red', margin: '5px 0 10px 0'}}>{formik.errors.password}</div>}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox/>}
                            {...formik.getFieldProps('rememberMe')}
                            style={{marginLeft: '0px'}}
                        />
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            style={{marginTop: '20px'}}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
