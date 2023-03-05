import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddMovie from "../pages/AddMovie";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ViewMovies from "../pages/ViewMovies";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact />\
        <Route path="/view_movies/:id" component={ViewMovies} exact />
        <Route path="/add" component={AddMovie} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/profile" component={Profile} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
