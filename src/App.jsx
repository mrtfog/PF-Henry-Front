import "./_app.scss";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";
import Function from "./components/Forms/Function";
import Register from './components/Users/Register'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies/:id" component={MovieDetail} />
        <Route exact path="/function" component={Function} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
