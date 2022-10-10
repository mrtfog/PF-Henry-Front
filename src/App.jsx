import "./_app.scss";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";
import ShowTime from "./components/Forms/ShowTime";
import Playlists from "./components/Playlists";
import Playlist from "./components/Playlist";
import Seats from "./components/SeatPicker";
import Graphics from "./components/AdminPanel/Statistics/Graphics";
import NavbarAdmin from "./components/AdminPanel/Navbar";
import Register from "./components/Users/Register";
import { useLocation } from "react-router-dom";
import AddToPlaylistPopUp from "./components/AddToPlaylistPopUp";
import Bookings from "./components/AdminPanel/Bookings";
import Users from "./components/AdminPanel/Users";
import LogIn from './components/Users/Login'
import Cart from "./components/Cart/Cart";
import AddToCartPopUp from "./components/AddToCartPopUp";
import Slider from "./components/Slider";
import EditProfile from "./components/Users/UserPanel/EditProfile";
import Payments from "./components/Users/UserPanel/Payments";
import NavbarUser from "./components/Users/UserPanel/NavbarUser";

function App() {
  const { pathname } = useLocation();
  if (pathname.includes("/admin")) {
    return (
      <div className="AppAdmin">
        <NavbarAdmin />
        <Switch>
          <Route exact path="/admin/statistics/graphics" component={Graphics} />
          <Route exact path="/admin/showTime" component={ShowTime} />
          <Route exact path="/admin/users" component={Users} />
          <Route exact path="/admin/bookings" component={Bookings} />
        </Switch>
      </div>
    );
  }
  if (pathname.includes("/profile")) {
    return (
      <div className="AppUser">
        <NavbarUser />
        <Switch>
          <Route exact path="/profile/edit" component={EditProfile} />
          <Route exact path="/profile/payments" component={Payments} />
        </Switch>
      </div>
    );
  }
  if (!pathname.includes("/admin") || !pathname.includes("/profile")) {
    return (
      <div className="App">
        {pathname.includes("/register") ? null : <Navbar /> }
        <AddToPlaylistPopUp />
        <AddToCartPopUp />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies/:id" component={MovieDetail} />
          <Route exact path="/seats" component={Seats} />
          <Route exact path="/playlists" component={Playlists} />
          <Route exact path="/playlists/:id" component={Playlist} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </div>
    );
  }
}

export default App;
