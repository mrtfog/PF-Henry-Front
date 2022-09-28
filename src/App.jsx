import MovieDetail from './components/MovieDetail';
import './_app.scss';
import Home from './components/Home';
import { Route, Switch } from 'react-router-dom'


function App() {

  return (
    <div className="App">

      <Switch>

        <Route exact path='/' component={Home} />
        <Route exact path='/movies/:id' component={MovieDetail} />
        
      </Switch>

    </div>
  );
}

export default App;
