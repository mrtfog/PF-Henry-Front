import "./_app.scss";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";
import Function from "./components/Forms/Function";
import Seats from "./components/SeatPicker";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies/:id" component={MovieDetail} />
        <Route exact path="/function" component={Function} />
        <Route exact path="/seats" component={Seats} />
      </Switch>
    </div>
  );
}

export default App;
