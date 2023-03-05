import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [modelShown, setModelShown] = useState(false);

  const history = useHistory();
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",

        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("unknown error occured try again later");
      }
    }
  };

  const onLogout = () => {
    // localStorage.removeItem("accessToken");
    // history.replace("/");
    setModelShown(true);
  };
  return (
    <>
      <MovieNavbar />
      <Container className="mt-1">
        Name:{userData.name}
        <br />
        Email:{userData.email}
        <br />
        Country:{userData.country}
        <br />
        <Button onClick={onLogout} variant="danger" type="button">
          Logout
        </Button>
      </Container>
      <Modal
        show={modelShown}
        onHide={() => {
          setModelShown(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure? </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModelShown(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("accessToken");
              history.replace("/");
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;
