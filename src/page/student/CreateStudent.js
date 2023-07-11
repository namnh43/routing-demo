import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import Creatable from 'react-select/creatable';
import * as Yup from "yup";
import {useEffect, useState} from "react";

const validSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, ">3 chars")
        .max(15, "<15 chars")
        .required("Required!"),
    desc: Yup.string()
        .optional()
});

export function CreateStudent() {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [studentCategory,setStudentCategory] = useState()
    useEffect(() => {
        //query list category
        axios.get("http://localhost:8080/api/category/v1").then((response) => {
            let categoryList = response.data.map((element, key) => {
                return {label: element.type, value: element.type};
            })
            setCategory(categoryList);
        })
    }, [])
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    desc: ''
                }}
                onSubmit={(values) => {
                    console.log('values', values)
                    values.description = values.desc; //update dong bo voi backend
                    values.studentCategory = {id: isNaN(studentCategory.id) ? 0 : studentCategory.id, type: studentCategory.type}
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
                        setTimeout(() => navigate('/'), 1500)
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
                            <th>Name:</th>
                            <td><Field name={'name'}></Field></td>
                            <span style={{color:"red"}}><ErrorMessage className={"text-bg-danger"} name={'name'}/></span>
                        </tr>
                        <tr>
                            <th>Description:</th>
                            <td><Field name={'desc'}></Field></td>
                            <span style={{color:"red"}}><ErrorMessage name={'desc'}/></span>
                        </tr>
                        <tr>
                            <th>Category:</th>
                            <Creatable
                                value={studentCategory && {label:studentCategory.type,value:studentCategory.id}}
                                options={category}
                                onChange={(opt, meta) => {
                                    setStudentCategory({id:opt.value,type:opt.label})
                                }}
                            />
                        </tr>
                        </tbody>
                    </table>
                    <button className='btn btn-primary'>Update</button>
                </Form>
            </Formik>
        </>
    )
}