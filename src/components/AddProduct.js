/* eslint-disable no-unused-vars */
import {React, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import Header from '../layouts/Header'

export default function AddProduct() {
  const history = useHistory();
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

  async function addProduct(event) {
    // console.warn(name, file, price, description)
    event.preventDefault();
    const formData = new FormData();
    formData.append('file_path', file);
    formData.append('price', price);
    formData.append('name', name);
    formData.append('description', description);
    let result = await fetch("http://localhost:8000/api/addproduct", {
      method: 'POST',
      body: formData
    });
    // alert(result)
    result = await result.json();
    alert("Data has been saved")
    history.push('/')
    }
  return (
    <div>
      <Header />
      <Form className="col-sm-6 offset-sm-3">
        <br />
        <input type="text" className="form-control"
          onChange={(e) => setName(e.target.value)}
          placeholder="name" required/> <br />
        <input type="text" className="form-control"
          onChange={(e) => setFile(e.target.value)}
          placeholder="Image URL" required/> <br />
        <input type="text" className="form-control"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="price" required/> <br />
        <input type="text" className="form-control"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description" required/> <br />
        <button onClick={addProduct} className="btn btn-primary">Add Product</button>
      </Form>
    </div>
  )
}
