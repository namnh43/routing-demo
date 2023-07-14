import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export function DetailTour() {
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
    const handleClick = () => {
        navigate('/tours')
    }
    return (
        <>
            <h6>Tour du lịch {tour.title}</h6>
            <h6>Giá: {tour.price}</h6>
            <h6>Giới thiệu: {tour.description}</h6>
            <button className='btn btn-primary' onClick={handleClick}>Danh sách</button>
        </>
    )
}