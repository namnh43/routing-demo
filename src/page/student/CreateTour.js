import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import Creatable from 'react-select/creatable';
import * as Yup from "yup";
import {useEffect, useState} from "react";

const validSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, ">3 chars")
        .max(15, "<15 chars")
        .required("Required!"),
    price: Yup.number()
        .required(),
    description: Yup.string()
        .optional()
});

export function CreateTour() {
    const navigate = useNavigate();
    useEffect(() => {
        //query list category

    }, [])
    const handleCancel = () => {
        navigate('/tours')
    }
    return (
        <>
            <Formik
                initialValues={{
                    title: '',
                    price: '',
                    description: ''
                }}
                onSubmit={(values) => {
                    console.log('values', values)
                    axios.post('http://localhost:3000/tuors', values).then(() => {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    ).then(() => {
                        setTimeout(() => navigate('/tours'), 1500)
                    }).catch((reason) => {
                        console.log('error', reason)
                    })
                }}
                enableReinitialize={true}
                validationSchema={validSchema}
            >
                <Form style={{textAlign: 'left'}}>
                    <table>
                        <tbody>
                        <tr hidden={true}>
                            <th>Id:</th>
                            <td><Field name={'id'}></Field></td>
                        </tr>
                        <tr>
                            <th>Tên tour:</th>
                            <td><Field name={'title'}></Field></td>
                            <span style={{color:"red"}}><ErrorMessage className={"text-bg-danger"} name={'name'}/></span>
                        </tr>
                        <tr>
                            <th>Giá:</th>
                            <td><Field name={'price'}></Field></td>
                            <span style={{color:"red"}}><ErrorMessage name={'price'}/></span>
                        </tr>
                        <tr>
                            <th>Mô tả:</th>
                            <td><Field name={'description'}></Field></td>
                            <span style={{color:"red"}}><ErrorMessage name={'description'}/></span>
                        </tr>
                        </tbody>
                    </table>
                    <button className='btn btn-primary mt-2'>Thêm mới</button>
                    <button className='btn btn-primary ms-2 mt-2' onClick={handleCancel}>Hủy</button>
                </Form>
            </Formik>
        </>
    )
}