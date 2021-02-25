import './App.css';
import Dashboard from './components/dashboard'
import {HashRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter basename='/covid-19'>
        <Switch>
          <Route exact path={'/'} component={Dashboard}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
