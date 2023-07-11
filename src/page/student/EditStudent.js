import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Creatable from "react-select/creatable";

const validSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, ">3 chars")
        .max(15, "<15 chars")
        .required("Required!"),
    desc: Yup.string()
        .optional()
});

export function EditStudent() {
    const {id} = useParams()
    const [student, setStudent] = useState({id: '', name: '', desc: '', studentCategory: {id: '', type: ''}});
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/students/v1/' + id).then((response) => {
            console.log(response.data)
            setStudent({
                id: response.data.id,
                name: response.data.name,
                desc: response.data.description,
                studentCategory: {id: response.data.studentCategory.id, type: response.data.studentCategory.type}
            });
        })
    }, []);
    useEffect(() => {
        //query list category
        axios.get("http://localhost:8080/api/category/v1").then((response) => {
            // let categoryList = response.data.map((element, key) => {
            //     return {label: element.type, value: element.type};
            // })
            console.log("category_list",response.data)
            let categoryList = response.data;
            setCategory(categoryList);
        })
    }, [])
    useEffect(() => {
        console.log('call here')
    })

    return (
        <>
            <Formik
                initialValues={{
                    id: student.id,
                    name: student.name,
                    desc: student.desc,
                }}
                onSubmit={(values,{resetForm}) => {
                    //call api save, then return list
                    values.description = values.desc; //update dong bo voi backend
                    values.studentCategory = {id: isNaN(student.studentCategory.id) ? 0 : student.studentCategory.id, type: student.studentCategory.type}
                    // console.log('save', values)
                    axios.put('http://localhost:8080/api/students/v1/update/' + id, values).then(() => {
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
                    })
                }}
                validationSchema={validSchema}
                enableReinitialize={true}
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
                            <ErrorMessage name={'name'}/>
                        </tr>
                        <tr>
                            <th>Description:</th>
                            <td><Field name={'desc'}></Field></td>
                            <ErrorMessage name={'desc'}/>
                        </tr>
                        <tr>
                            <th>Category:</th>
                            <Creatable
                                value={{label:student.studentCategory.type,value:student.studentCategory.id}}
                                options={(category.map((element, key) => {
                                    return {label: element.type, value: element.id};
                                }))}
                                onChange={(opt, meta) => {
                                    console.log('opt',opt)
                                    console.log('student',student)
                                    setStudent({...student,studentCategory:{id:opt.value,type:opt.label}})
                                }
                                }
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