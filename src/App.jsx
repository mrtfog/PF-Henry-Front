import "./_app.scss";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";
import Function from "./components/Forms/Function";
import Playlists from "./components/Playlists";
import Playlist from "./components/Playlist";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies/:id" component={MovieDetail} />
        <Route exact path="/function" component={Function} />
        <Route exact path='/playlists' component={Playlists} />
        <Route exact path='/playlists/:id' component={Playlist} />

      </Switch>
    </div>
  );
}

export default App;
