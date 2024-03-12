import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useId } from "react";
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import css from './LoginForm.module.css';

const userShema = Yup.object().shape(
    {
        email: Yup.string()
            .email('Invalid email')
            .required('This is required field'),
        password: Yup.string()
            .min(8, 'Too Short!')
            .max(30, 'Too Long!')
            .required('This is required field')
    }
)

const LoginForm = () => {
    const emailId = useId();
    const passwordId = useId();
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={
                {
                    email: '',
                    password: ''
                }}
            validationSchema={userShema}
            onSubmit={(values, actions) => {
                dispatch(logIn(values))
                actions.resetForm();
            }}>
            <Form className={css.form} autoComplete="off">
                <label htmlFor={emailId} className={css.label}>
                    Email
                    <Field type="email" name="email" id={emailId} />
                    <ErrorMessage className={css.error} name="email" component="span" />
                </label>
                <label htmlFor={passwordId} className={css.label}>
                    Password
                    <Field type="password" name="password" id={passwordId} />
                    <ErrorMessage className={css.error} name="password" component="span" />
                </label>
                <button type="submit">Log In</button>
            </Form>
        </Formik>
    );
};

export default LoginForm