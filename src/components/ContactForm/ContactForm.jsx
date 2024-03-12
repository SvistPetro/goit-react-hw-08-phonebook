import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useId } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addContact } from '../../redux/contacts/operations'
import { selectContactList } from '../../redux/contacts/selectors'
import css from './ContactForm.module.css'

const contactShema = Yup.object().shape(
    {
        name: Yup.string()
            .min(3, 'Name must be at least 3 symb long')
            .required('This is required field'),
        number: Yup.string()
            .min(7, 'Too Short!')
            .max(20, 'Too Long!')
            .required('A phone number is required')
    }
)

const ContactForm = () => {
    const nameId = useId();
    const numberId = useId();
    const dispatch = useDispatch();
    const contacts = useSelector(selectContactList);

    return (
        <Formik
            initialValues={
                {
                    name: '',
                    number: ''
                }}
            validationSchema={contactShema}
            onSubmit={(values, actions) => {
                const duplicate = contacts.some(contact => contact.name.toLowerCase() === values.name.toLowerCase());
                if(duplicate) {
                    alert(`${values.name} is already in contacts`);
                    return;
                }
                dispatch(addContact(values));
                actions.resetForm(values);
            }}
        >
            <Form className={css.form}>
                <label htmlFor={nameId} className={css.label}>
                    <span className={css.name}>Name</span>
                    <Field type="name" name="name" className={css.input} id={nameId} />
                    <ErrorMessage className={css.error} name="name" component="span" />
                </label>
                <label htmlFor={numberId} className={css.label}>
                    <span className={css.name}>Number</span>
                    <Field type="phone" name="number" className={css.input} id={numberId} />
                    <ErrorMessage className={css.error} name="number" component="span" />
                </label>
                <button type="submit" className={css.button}>Add contact</button>
            </Form>
        </Formik>
    )
}

export default ContactForm