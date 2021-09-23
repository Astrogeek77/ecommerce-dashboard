import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Header() {
  let history = useHistory();
  let user = JSON.parse(localStorage.getItem("user-info"));
  // console.warn("user", user);
  function logout() {
    localStorage.clear();
    history.push("/login");
  }
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className={"justify-content-between"} id="responsive-navbar-nav">
              <Nav className="mr-auto nav-bar-wrapper">
                  {localStorage.getItem("user-info") ? (
                      <>
                      <Link to="/">Product List</Link>
                      <Link to="/add">Add Product</Link>
                      <Link to="/search">Search Product</Link>
                      </>
                  ) : (
                      <>
                      <Link to="/login">Login </Link>
                      <Link to="/register">Register </Link>
                      </>
                  )}
              </Nav>
              <Nav>
              {localStorage.getItem("user-info") ? (
                  <NavDropdown className="float-right" title={user && user.name}>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  </NavDropdown>
              ) : null}
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>   
    </div>
  );
}

export default Header;
