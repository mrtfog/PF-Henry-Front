import "./_app.scss";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";
import Function from "./components/Forms/Function";
import Playlists from "./components/Playlists";
import Playlist from "./components/Playlist";
import Seats from "./components/SeatPicker";
import Statistics from "./components/AdminPanel/Statistics";
import NavbarAdmin from "./components/AdminPanel/Navbar";
import { useLocation } from "react-router-dom";
import AddPlaylist from "./components/Forms/AddPlaylist";

function App() {
  const { pathname } = useLocation();
  if (!pathname.includes("/admin")) {
    return (
      <div className="App">
        <Navbar />
        <AddPlaylist />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies/:id" component={MovieDetail} />
          <Route exact path="/seats" component={Seats} />
          <Route exact path="/playlists" component={Playlists} />
          <Route exact path="/playlists/:id" component={Playlist} />

        </Switch>
      </div>
    );
  }
  if (pathname.includes("/admin")) {
    return (
      <div className="AppAdmin">
        <NavbarAdmin />
        <Switch>
          <Route exact path="/admin/statistics" component={Statistics} />
          <Route exact path="/admin/function" component={Function} />
        </Switch>
      </div>
    );
  }
}

export default App;
