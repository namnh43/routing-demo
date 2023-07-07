import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export function ListStudent() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/students/v1").then((response) => {
            setStudents(response.data)
        })
    },[])
    useEffect(() => {
        console.log('1',students);
    })

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
                axios.delete('http://localhost:8080/api/students/v1/delete/'+id).then((response) => {
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
                        setStudents(students.filter(s => (s.id !== id)))
                    }
                })
            }
        })
    }

    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {students.map((item,key) => {
                    return (
                        <tr>
                            <td>
                                <Link to={'/students/'+item.id}>{item.id}</Link>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td><button onClick={() => {
                                handleDelete(item.id)
                            }
                            }>Delete</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}