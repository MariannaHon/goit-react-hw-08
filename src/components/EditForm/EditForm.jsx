
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { patchContact } from "../../redux/contacts/operations";


export default function EditForm({ initialValues, onRequestClose }) {

    const dispatch = useDispatch();

    const Validator = Yup.object().shape({
        name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
        number: Yup.string().required("Required"),
    })

    const handleSubmit = (values) => {
        dispatch(patchContact(initialValues.id, values));
        onRequestClose();
        console.log(initialValues.id, values)
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Validator}
            onSubmit={handleSubmit}>
            <Form>
                <div>
                    <label htmlFor="name" >Name</label>
                    <Field type="text" name="name"></Field>

                    <ErrorMessage name="name" component="span" />
                </div>
                <div>
                    <label htmlFor="number" >Number</label>
                    <Field type="text" name="number"></Field>

                    <ErrorMessage name="number" component="span" />
                </div>
                <button type="submit">Edit contact</button>
            </Form>
        </Formik>
    )
}