import Header from "../layouts/Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
function ProductList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function deleteOperation(id) {
    let result = await fetch("http://localhost:8000/api/delete/" + id, {
      method: "DELETE",
    });
    result = await result.json();
    // console.warn(result);
    getData();
  }

  async function getData() {
    let result = await fetch("http://localhost:8000/api/listproducts");
    result = await result.json();
    setData(result);
  }
  return (
    <div>
      <Header />
      <h1>All Products</h1>
      <div className="col-sm-10 offset-sm-1">
        <Table striped responsive bordered>
          <tbody>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Category</td>
              <td>Price</td>
              <td>Description</td>
              <td>Image</td>
              <td>Operations</td>
            </tr>
            {data.slice(0).reverse().map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>    
                <td>
                  <img
                    style={{ width: 100 }}
                    alt={item.name}
                    src={item.file_path}
                  />
                </td>
                <td>
                  <span
                    onClick={() => deleteOperation(item.id)}
                    className="delete">
                    Delete
                  </span>
                  <Link to={"/update/" + item.id}>
                    <span className="update">Update</span>
                  </Link>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProductList;
