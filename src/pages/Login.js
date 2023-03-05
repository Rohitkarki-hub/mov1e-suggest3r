import axios from "axios";
import { useRef, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";

const Login = () => {
  const [modelShown, setModelShown] = useState(false);
  const [modelText, setModelText] = useState("");
  const email = useRef();
  const password = useRef();

  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();
    const LoginData = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        LoginData,
        {
          timeout: 10000,
        }
      );
      //alert(response.data.message);
      setTimeout(() => {
        history.replace("/");
      }, 2000);

      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccessToken);

      if (response.data.status === "success") {
        setModelText("Loggedin succesfully");
        setModelShown(true);
      }
    } catch (error) {
      if (error.response) {
        // alert(error.response.data.errors[0].message);
        setModelText(error.response.data.errors[0].message);
        setModelShown(true);
      } else {
        setModelText("unknown error occurerd");
        setModelShown(true);
      }
    }
  };
  return (
    <>
      <MovieNavbar />
      <Container>
        Login Screen
        <form onSubmit={loginHandler}>
          {/* <br /> Email:
          <input type="text" ref={email}></input> <br /> */}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={email}
              autoComplete={false}
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>
          {/* Password:
          <br />
          <input type="password" ref={password}></input> <br /> */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={password} autoComplete={false} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </form>
      </Container>

      <Modal
        show={modelShown}
        onHide={() => {
          setModelShown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{modelText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModelShown(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Login;
