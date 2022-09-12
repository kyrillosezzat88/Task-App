import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email:yup.string().email('Please Enter Valid Email').required('Email Required'),
    password:yup.string().required('Password Required'),
})