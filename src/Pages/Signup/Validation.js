import * as yup from 'yup';

export const userSchema = yup.object().shape({
    firstname:yup.string().required('First Name Required'),
    lastname:yup.string(),
    email:yup.string().email('Please Enter Valid Email').required('Email Required'),
    password:yup.string().min(6,"Please Enter at least 6 characters").required('Password Required'),
    confirm_password:yup.string().oneOf([yup.ref('password'),null],'Passwords must match').required('Confirm Password Required')
})