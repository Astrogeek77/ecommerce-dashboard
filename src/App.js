import './App.css';
// import { Button } from 'react-bootstrap'
import {BrowserRouter, Route} from 'react-router-dom'

import AddProduct from './components/AddProduct'
import UpdateProduct from './components/UpdateProduct'
import Login from './pages/Login'
import Register from './pages/Register'

import Protected from './middleware/Protected';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/add">
            <Protected Cmp={AddProduct} />
            {/* <AddProduct /> */}
          </Route>
          <Route path="/update">
          <Protected Cmp={UpdateProduct} />
            {/* <UpdateProduct /> */}
          </Route>
        </BrowserRouter>
      </div>
    
  );
}

export default App;
