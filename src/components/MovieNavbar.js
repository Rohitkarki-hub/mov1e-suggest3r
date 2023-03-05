import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieNavbar = () => {
  return (
    <>
      <Navbar className="bg-dark ">
        <Container>
          <Navbar.Brand href="#home" className="text-light">
            <Link to="/" className="text-light ">
              {" "}
              Movie Suggester
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end gap-2">
            <Navbar.Text>
              {" "}
              <Link to="/add" className="text-light ">
                Add a movie
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              {localStorage.getItem("accessToken") ? (
                <>
                  <Link to="/profile" className="text-light ">
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <Link to="/login" className="text-light">
                    Login
                  </Link>
                </>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default MovieNavbar;
