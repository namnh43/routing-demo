import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


export function EditTour() {
    const {id} = useParams()
    const [tour, setTour] = useState({id: '', title: '', price: '', description:''});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/tuors/' + id).then((response) => {
            console.log(response.data)
            setTour({
                id: response.data.id,
                title: response.data.title,
                price: response.data.price,
                description: response.data.description,
            });
        })
    }, []);


    const handleCancel = () => {
        navigate('/tours')
    }
    return (
        <>
            <Formik
                initialValues={{
                    id: tour.id,
                    title: tour.title,
                    price: tour.price,
                    description: tour.description,
                }}
                onSubmit={(values) => {
                    //call api save, then return list
                    console.log('save', values)
                    axios.put('http://localhost:3000/tuors/' + id, values).then(() => {
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
                    })
                }}
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
                            <th>Tên tour:</th>
                            <td><Field name={'title'} style={{width:'300px'}}></Field></td>
                            {/*<ErrorMessage name={'title'}/>*/}
                        </tr>
                        <tr>
                            <th>Giá:</th>
                            <td><Field name={'price'} style={{width:'300px'}}></Field></td>
                            {/*<ErrorMessage name={'desc'}/>*/}
                        </tr>
                        <tr>
                            <th>Mô tả:</th>
                            <td colSpan="10"><Field component={'textarea'} style={{height:'200px',width:'300px'}} name={'description'}></Field></td>
                        </tr>
                        </tbody>
                    </table>
                    <button type="submit"  className='btn btn-primary mt-2'>Sửa</button>
                    <button className='btn btn-primary mt-2 ms-2' onClick={handleCancel}>Hủy</button>
                </Form>
            </Formik>
        </>
    )
}