import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";

export function ListTour() {
    const [tours, setTours] = useState([]);
    const [valid, setValid] = useState(true);
    const searchValue = useSelector((state) => {
        return state.search.textSearch
    });
    const navigate = useNavigate();

    useEffect( () => {
        console.log('re-render ...')
        let url = "http://localhost:3000/tuors";
        if (searchValue != '') {
            url += "/search?name="+searchValue;
        }
        axios.get(url).then(async (response) => {
            setValid(true);
            setTours(response.data)
        }).catch(reason => {
            setValid(false);
            setTours([]);
        })
    },[searchValue])

    const handleEdit = (id) => {
        console.log('edit')
        navigate(''+id)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:3000/tuors/'+id).then((response) => {
                    console.log(response)
                    Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your file has been deleted.',
                            showConfirmButton: false,
                            timer: 1500
                        }
                    )
                    if (response.status === 200) {
                        setTours(tours.filter(s => (s.id !== id)))
                    }
                })
            }
        })
    }

    return (
        <>
            <h5>
                <Link to='create-tour'>Thêm</Link>
            </h5>
            {valid &&
            (<table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {tours.map((item,key) => {
                    return (
                        <tr>
                            <td hidden={true}>{item.id}</td>
                            <td>{key + 1}</td>
                            <td>
                                <Link to={'detail/'+item.id}>{item.title}</Link>

                            </td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td><button className="btn btn-warning" onClick={() => {
                                handleEdit(item.id)
                            }}>Edit</button></td>
                            <td><button className="btn btn-danger" onClick={() => {
                                handleDelete(item.id)
                            }
                            }>Delete</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>)}
            {!valid &&
            <h6 style={{textAlign:"left"}}>Can't load data, please check your API!!!</h6>}
        </>
    )
}