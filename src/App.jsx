import { Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Navbar from './components/common/Navbar';
import ShowTime from "./components/Forms/ShowTime";
import Playlists from "./components/Playlist/Playlists";
import Playlist from "./components/Playlist/Playlist";
import Graphics from "./components/AdminPanel/Statistics/Graphics";
import NavbarAdmin from "./components/AdminPanel/Navbar";
import Register from "./components/Users/Register";
import AddToPlaylistPopUp from "./components/Playlist/AddToPlaylistPopUp";
import Bookings from "./components/AdminPanel/Bookings";
import LogIn from "./components/Users/Login";
import AddToCartPopUp from "./components/Cart/AddToCartPopUp";
import EditProfile from "./components/Users/UserPanel/EditProfile";
import Payments from "./components/Users/UserPanel/Payments";
import NavbarUser from "./components/Users/UserPanel/NavbarUser";
import SelectSeatsPopUp from "./components/Cart/SelectSeatsPopUp";
import { useAuth } from "./contexts/AuthContext";
import Movies from "./components/Movies/Movies";
import Subscriptions from "./components/AdminPanel/Statistics/Subscriptions";
import Sales from "./components/AdminPanel/Statistics/Sales";
import "./_app.scss";
import Rooms from "./components/AdminPanel/Rooms";
import Review from "./components/Forms/Review";
import WebsiteReviews from "./components/WebsiteReviews/WebsiteReviews";
import Subscription from "./components/Subscription/Subscription";

import NewCart from "./components/Cart/NewCart";

function App() {
  const { pathname } = useLocation();
  const { currentUser } = useAuth();

  if (!currentUser)
    if (!JSON.parse(sessionStorage.getItem("newCart")))
      sessionStorage.setItem("newCart", JSON.stringify([]));

  if (pathname.includes("/admin")) {
    return (
      <div className="AppAdmin">
        <NavbarAdmin />
        <Switch>
          <Route exact path="/admin/statistics/graphics" component={Graphics} />
          <Route exact path="/admin/statistics/sales" component={Sales} />
          <Route exact path="/admin/statistics/subscriptions" component={Subscriptions}/>
          <Route exact path="/admin/showTime" component={ShowTime} />
          <Route exact path="/admin/bookings" component={Bookings} />
          <Route exact path="/admin/rooms" component={Rooms} />
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
        {pathname.includes("/register") ? null : <Navbar />}
        {currentUser ? (
          <>
            <AddToPlaylistPopUp />
            <SelectSeatsPopUp />
            <Review />
          </>
        ) : null}
        <AddToCartPopUp />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies/:id" component={MovieDetail} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/playlists" component={Playlists} />
          <Route exact path="/playlists/:id" component={Playlist} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/cart" component={NewCart} />
          <Route exact path="/reviews" component={WebsiteReviews} />
          <Route exact path="/subscribe" component={Subscription} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;