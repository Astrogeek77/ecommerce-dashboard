/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect} from 'react'
import Header from '../layouts/Header'
import { withRouter } from 'react-router-dom'

function UpdateProduct(props) {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useState([])

    var props = props
    var id = props.match.params.id

    console.warn("props", props.match.params.id)

    useEffect(async (props, id) => {
        let result = await fetch("http://localhost:8000/api/product/" + id);
        result = await result.json();
        setData(result)
        setName(result.name);
        setPrice(result.price);
        setDescription(result.description);
        setFile(result.file);
    },[])

    async function editProduct(id, e)
    {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('price', price);
        formData.append('name', name);
        formData.append('description', description);
        console.log(formData)
        let result = await fetch("http://localhost:8000/api/update/"+id+"?_method=PUT", {
            method: 'POST',
            body: formData
        });
        alert("Data has been updated")
    } 
    return (
        <div>
            <Header />
            <h1>Update Product</h1>
            <input type="text"
            onChange={(e)=>setName(e.target.value)}
             defaultValue={data.name} /> <br /> <br />
            <input type="text"
             onChange={(e)=>setPrice(e.target.value)}
             defaultValue={data.price} /> <br /> <br />

            <input type="text"
             onChange={(e)=>setDescription(e.target.value)}
             defaultValue={data.description} /> <br /> <br />
            <input type="text" 
            onChange={(e) => setFile(e.target.value)}
            defaultValue={data.file} /> <br /> <br />
            <img style={{ width: 100 }} alt={data.name} src={data.file} /> <br /> <br />

            <button onClick={()=>{editProduct(data.id)}}>Update Product</button>
        </div>
    )
}

export default withRouter(UpdateProduct);
