/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect} from 'react'
import Header from '../layouts/Header'
import { withRouter, useHistory } from 'react-router-dom'
import Select from 'react-select'

function UpdateProduct(props) {
    const [name, setName] = useState("");
    const [file_path, setFile_path] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useState([])
    const history = useHistory()
    // console.log(data)

    // var id = props.match.params.id

    // console.warn("id", props.match.params.id)

    useEffect(async () => {
        let result = await fetch("http://localhost:8000/api/product/" + props.match.params.id);
        result = await result.json();
        // console.log(result)
        setData(result)
        setName(result.name);
        setPrice(result.price);
        setDescription(result.description);
        setFile_path(result.file_path);
    },[])

    async function editProduct(id)
    {
        const formData = new FormData();
        formData.append('file_path', file_path);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('name', name);
        formData.append('description', description);
        // console.log(formData)
        // console.log(id)
        let result = await fetch("http://localhost:8000/api/update/"+id+"?_method=PUT", {
            method: 'POST',
            body: formData
        });
        alert("Data has been updated")
        history.push('/')
    } 

    const options = [
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Fashion', label: 'Fashion' },
        { value: 'Fitness', label: 'Fitness' },
        { value: 'Books and Academics', label: 'Books and Academics' },
        { value: 'Daily Goods', label: 'Daily Goods' },
      ]

    return (
        <div>
            <Header />
            <div className="col-sm-8 offset-sm-2">
                <h1>Update Product</h1>
                <input className="form-control" type="text"
                onChange={(e)=>setName(e.target.value)}
                defaultValue={data.name} /> <br />
                <Select
                    // className="form-control"
                    required
                    // defaultValue={data.category}
                    placeholder="Select a Category for the Product"
                    // defaultInputValue={data.category}
                    // value={options.filter(option => option.label === category)}
                    // label="Choose a Category For the Product"
                    onChange={(e) => setCategory(e.value)}
                    options={options}
                    />
                <br />
                <input className="form-control" type="text"
                onChange={(e)=>setPrice(e.target.value)}
                defaultValue={data.price} /> <br />
                <textarea className="form-control" 
                onChange={(e)=>setDescription(e.target.value)}
                defaultValue={data.description}
                style={{ "height": 100, "resize": "none" }} /> <br />
                <input className="form-control" type="text" 
                onChange={(e) => setFile_path(e.target.value)}
                defaultValue={data.file_path} /> <br />
                <img style={{ width: 100 }} alt={data.name} src={data.file_path} /> <br />

                <button className="btn btn-success mt-3 p-2" onClick={()=>{editProduct(data.id)}}>Update Product</button>
            </div>
        </div>
    )
}

export default withRouter(UpdateProduct);
