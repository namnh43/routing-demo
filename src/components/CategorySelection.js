import {useEffect, useState} from "react";
import axios from "axios";

export function CategorySelection() {
    const [category,setCategory] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        //query list category
        axios.get("http://localhost:8080/api/category/v1").then((response) => {
            let categoryList = response.data.map((element,key) => {
                return {label:element.type,value:element.type};
            })
            setCategory(categoryList);
        })
    },[])
    return (
        <>
        </>
    )
}