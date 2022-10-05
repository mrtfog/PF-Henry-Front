import "./_app.scss";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";
import Function from "./components/Forms/Function";
import Seats from "./components/SeatPicker";
import Statistics from "./components/AdminPanel/Statistics";
import NavbarAdmin from "./components/AdminPanel/Navbar";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  if (!pathname.includes("/admin")) {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies/:id" component={MovieDetail} />
          <Route exact path="/seats" component={Seats} />
        </Switch>
      </div>
    );
  }
  if (pathname.includes("/admin")) {
    return (
      <div className="AppAdmin">
        <NavbarAdmin />
        <Switch>
          {/* RUTAS ADMIN */}

          <Route exact path="/admin/statistics" component={Statistics} />
          <Route exact path="/admin/function" component={Function} />
        </Switch>
      </div>
    );
  }
}

export default App;
