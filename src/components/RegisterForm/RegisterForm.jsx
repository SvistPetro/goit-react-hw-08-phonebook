import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useId } from "react";
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegisterForm.module.css';

const userShema = Yup.object().shape(
  {
    name: Yup.string()
      .min(3, 'Name must be at least 3 symb long')
      .required('This is required field'),
    email: Yup.string()
      .email('Invalid email')
      .required('This is required field'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(30, 'Too Long!')
      .required('This is required field')
    }
)

const RegisterForm = () => {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={
        {
          name: '',
          email: '',
          password: ''
        }}
      validationSchema={userShema}
      onSubmit={(values, actions) => {
          dispatch(register(values))
          actions.resetForm();
      }}
    >
      <Form className={css.form} autoComplete="off">
        <label htmlFor={nameId} className={css.label}>
          Username
          <Field type="name" name="name" id={nameId} />
          <ErrorMessage className={css.error} name="name" component="span" />
        </label>
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
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default RegisterForm