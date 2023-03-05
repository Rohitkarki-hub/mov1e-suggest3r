import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";
import SingleMovie from "../components/SingleMovie";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsErros] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [searchMovieText, setSearchMovieText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstRun, steFirstRun] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    //searching code
    if (!firstRun) {
      const fetchTimer = setTimeout(() => {
        if (searchMovieText && searchMovieText.length > 2) {
          fetchMovies();
        } else if (searchMovieText.length < 1) {
          fetchMovies();
        } else {
          setSearchErrorText("please enterr atleast 3 characters");
        }
      }, 800);
      //cleanup function
      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchMovieText]);

  const fetchMovies = async () => {
    //FETCH RESOURCE
    setLoading(true);
    setSearchErrorText("");

    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );
      setMovies(response.data.moviesData);
      setIsErros(false);
      setLoading(false);
      steFirstRun(false);
    } catch (error) {
      setIsErros(true);
      setErrorText("cannot get movies");
      setLoading(false);
      steFirstRun(false);
    }

    console.log(movies);
  };
  return (
    <div className="App">
      <MovieNavbar />
      <div>
        <div className="text-center">
          <Container>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={searchMovieText}
                placeholder="Type Movie Title"
                onChange={(e) => setSearchMovieText(e.target.value)}
              />
              {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
            </Form.Group>
          </Container>
        </div>

        <span style={{ color: "red" }}>{searchErrorText}</span>
      </div>

      {isError ? (
        <>
          <div
            style={{
              background: "red",
              color: "#fff",
              padding: "10px",
              margin: "10px",
            }}
          >
            {errorText}
          </div>
        </>
      ) : (
        <>
          <div
            style={{ background: "#e7e7e7", padding: "10px", margin: "5px" }}
          >
            <dif>
              {loading ? (
                <>
                  <Container className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </Container>
                </>
              ) : (
                <></>
              )}
            </dif>{" "}
            <br />
            {loading && movies.length < 1 ? (
              <>No movie found</>
            ) : (
              <>
                <Row>
                  {movies.map((el) => (
                    <SingleMovie data={el} />
                    // <div key={el.id}>
                    //   <Link to={`/view_movies/${el.id}`}>
                    //     <span style={{ fontWeight: "bold" }}>{el.name}</span>
                    //   </Link>
                    //   <br /> <br />
                    //   <img
                    //     src={el.image}
                    //     alt="img err"
                    //     style={{ height: "100px" }}
                    //   />
                    //   <br />
                    //   info:{el.info}
                    //   <br />
                    //   Rating:{el.rating}
                    //   <br />
                    //   <br />
                    //   <br />
                    // </div>
                  ))}
                </Row>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Index;
