import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import Swal from "sweetalert2";

export function CreateStudent() {
    const navigate = useNavigate();
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    desc: ''
                }}
                onSubmit={(values) => {
                    // console.log(values)
                    values.description = values.desc;
                    axios.post('http://localhost:8080/api/students/v1/add', values).then(() => {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    ).then(() => {
                        setTimeout(() => navigate('/'),1500)
                    })
                }}>
                <Form style={{textAlign: 'left'}}>
                    <table>
                        <tbody>
                        <tr>
                            <th>Name:</th>
                            <td><Field name={'name'}></Field></td>
                        </tr>
                        <tr>
                            <th>Description:</th>
                            <td><Field name={'desc'}></Field></td>
                        </tr>
                        </tbody>
                    </table>
                    <button>Save</button>
                </Form>

            </Formik>
        </>
    )
}