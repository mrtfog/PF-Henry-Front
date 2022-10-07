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
import Register from "./components/Users/Register";
import { useLocation } from "react-router-dom";
import AddToPlaylistPopUp from "./components/AddToPlaylistPopUp";
import Bookings from "./components/AdminPanel/Bookings";
import Users from "./components/AdminPanel/Users";
import Login from "./components/Users/Login";
import Cart from "./components/Cart";
import AddToCartPopUp from "./components/AddToCartPopUp";

function App() {
  const { pathname } = useLocation();
  if (!pathname.includes("/admin")) {
    return (
      <div className="App">
        {pathname.includes("/register") ? null : pathname.includes(
            "login"
          ) ? null : (
          <Navbar />
        )}
        <AddToPlaylistPopUp />
        <AddToCartPopUp />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies/:id" component={MovieDetail} />
          <Route exact path="/seats" component={Seats} />
          <Route exact path="/playlists" component={Playlists} />
          <Route exact path="/playlists/:id" component={Playlist} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cart" component={Cart} />
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
          <Route exact path="/admin/users" component={Users} />
          <Route exact path="/admin/bookings" component={Bookings} />
        </Switch>
      </div>
    );
  }
}

export default App;
