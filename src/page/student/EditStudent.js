import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export function EditStudent() {
    const {id} = useParams()
    const [student,setStudent] = useState({id:'',name:'',desc:''});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/api/students/v1/'+id).then((response)=> {
            console.log(response.data)
            setStudent({id: response.data.id,name:response.data.name,desc:response.data.description});
        }).then(() => {
            console.log('after update',student);
        })
    },[]);
    useEffect(()=> {
        console.log('re-render')
    })
    return (
        <>
            <Formik
                initialValues={{
                    id: student.id,
                    name: student.name,
                    desc: student.desc
                }}
                onSubmit={(values) => {
                    //call api save, then return list
                    console.log('save',values)
                    values.description = values.desc; //update dong bo voi backend
                    axios.put('http://localhost:8080/api/students/v1/update/'+id,values).then(() => {
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
                }}
                enableReinitialize={true}
            >
                <Form style={{textAlign : 'left' }}>
                    <table>
                        <tbody>
                        <tr hidden={true}>
                            <th>Id:</th>
                            <td><Field name={'id'} ></Field></td>
                        </tr>
                        <tr>
                            <th>Name:</th>
                            <td><Field name={'name'} ></Field></td>
                        </tr>
                        <tr>
                            <th>Description:</th>
                            <td><Field name={'desc'}></Field></td>
                        </tr>
                        </tbody>
                    </table>
                    <button className='btn-primary'>Update</button>
                </Form>
            </Formik>
        </>
    )
}