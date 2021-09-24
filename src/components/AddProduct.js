/* eslint-disable no-unused-vars */
import {React, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import Header from '../layouts/Header'
import Select from 'react-select'

export default function AddProduct() {
  const history = useHistory();
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [category, setCategory] = useState("academics");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    console.log(category)

  async function addProduct(event) {
    // console.warn(name, file, price, description)
    event.preventDefault();
    const formData = new FormData();
    formData.append('file_path', file);
    formData.append('category', category);
    console.log(category)
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
    // if (result.status === 200) {
       
    //   }
    history.push("/")
    }

    const options = [
      { value: 'Electronics', label: 'Electronics' },
      { value: 'Fashion', label: 'Fashion' },
      { value: 'Fitness', label: 'Fitness' },
      { value: 'Books and Academics', label: 'Books and Academics' },
      { value: 'Daily Goods', label: 'Daily Goods' },
    ];

  return (
    <div>
      <Header />
      <h1>Add New Product</h1>
      <Form className="col-sm-6 offset-sm-3">
        <br />
        <input type="text" className="form-control"
          onChange={(e) => setName(e.target.value)}
          placeholder="name" required/> <br />
        
        <Select
          // className="form-control"
          required
          placeholder="Select a Category for the Product"
          // aria-label="Choose a Category For the Product"
          onChange={(options) => setCategory(options.value)}
          options={options}
        />
        <br />

        <input type="text" className="form-control"
          onChange={(e) => setFile(e.target.value)}
          placeholder="Image URL" required/> <br />
        <input type="text" className="form-control"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="price" required/> <br />
        <textarea className="form-control"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description" style={{ "height": 100, "resize": "none" }} required/> <br />
        <button onClick={addProduct} className="btn btn-primary">Add Product</button>
      </Form>
    </div>
  )
}