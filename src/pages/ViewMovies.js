import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";

const ViewMovies = () => {
  const getParams = useParams();
  const getID = getParams.id;

  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    getSingleMovieInfo();
  }, []);

  const getSingleMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      alert("error occured");
    }
  };

  return (
    <>
      <MovieNavbar />
      <Container>
        <h1 className="text-info">{movieData.name}</h1>
        <Card body>
          <img
            src={movieData.image}
            alt="img err"
            style={{ height: "200px" }}
          />
          <br />
          Rating: {movieData.rating}
        </Card>
        Info:
        <Card body>{movieData.info}</Card>
        Description:
        <Card body>{movieData.desc}</Card>
        <Link to="/">
          {" "}
          <Button className="bg-dark">Go back!</Button>
        </Link>
        <br />
      </Container>
    </>
  );
};

export default ViewMovies;
