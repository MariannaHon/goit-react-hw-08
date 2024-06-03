import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import css from './LoginForm.module.css';

export default function LoginForm() {
    const dispatch = useDispatch();

    const Validator = Yup.object().shape({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
    })

    const initialValues = {
        email: "",
        password: "",
    };

    const handleSubmit = (values, actions) => {
        dispatch(logIn(values));
        actions.resetForm();
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Validator}
            onSubmit={handleSubmit}>
            <Form>
                <label>
                    Email
                    <Field type="text" name="email" />
                    <ErrorMessage name="email" component="div" />
                </label>
                <label>
                    Password
                    <Field type="text" name="password" />
                    <ErrorMessage name="password" component="div" />
                </label>
                <button type="submit">Log In</button>
            </Form>
        </Formik>
    );
}