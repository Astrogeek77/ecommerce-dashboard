import "./App.css";
// import { Button } from 'react-bootstrap'
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import ProductList from "./components/ProductList";

import SearchProduct from "./components/SearchProduct";

import Login from "./auth/Login";
import Register from "./auth/Register";

import Protected from "./middleware/Protected";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            <Protected Cmp={ProductList} />
          </Route>
          <Route path="/update/:id">
            <Protected Cmp={UpdateProduct} />
          </Route>
          <Route path="/add">
            <Protected Cmp={AddProduct} />
          </Route>
          <Route path="/search">
            <Protected Cmp={SearchProduct} />
          </Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
