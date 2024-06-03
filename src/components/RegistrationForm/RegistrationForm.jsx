import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import css from './RegisterForm.module.css';

export default function RegistrationForm() {
    const dispatch = useDispatch();

    const Validator = Yup.object().shape({
        name: Yup.string().min(2, "Too Short!").max(15, "Too Long!").required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().min(5, "Too Short!").max(25, "Too Long!").required("Required"),
    })

    const initialValues = {
        name: '',
        email: '',
        password: '',
    }

    const handleSubmit = (values, actions) => {
        dispatch(register(values));
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Validator}
            onSubmit={handleSubmit}>
            <Form>
                <label>
                    Username
                    <Field type="text" name="name" />
                    <ErrorMessage name="name" component="div" />
                </label>
                <label>
                    Email
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </label>
                <label>
                    Password
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                </label>
                <button type="submit">Register</button>
            </Form>
        </Formik>
    );
}