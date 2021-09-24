import Header from "../layouts/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
function SearchProduct() {
  const [data, setData] = useState([]);

  async function search(key) {
    console.warn(key);

    let result = await fetch("http://localhost:8000/api/search/" + key);
    result = await result.json();
    console.warn(result);
    setData(result);
  }

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
      <div className="col-sm-8 offset-sm-2">
        <h1>Search Product</h1>
        <br />
        <input
          type="text"
          onChange={(e) => search(e.target.value)}
          className="form-control"
          placeholder="Search Product"
        />
        <Table striped responsive bordered>
            <tbody>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Category</td>
                    <td>Description</td>
                    <td>Image</td>
                    <td>Operations</td>
                </tr>
                {data.map((item) => (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
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

export default SearchProduct;
