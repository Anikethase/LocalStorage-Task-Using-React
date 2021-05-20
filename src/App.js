
import './App.css';
import Assignment3 from './components/Assignment3';
import Assignment4 from './components/Assignment4';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route key="assignment3" path="/" exact={true} name="Assignment3">
            <Assignment3 />
        </Route>
        <Route key="assignment4" path="/assignment4" exact={true} name="Assignment4">
            <Assignment4 />
        </Route>
      </Switch>
    </BrowserRouter>
  //  <About />
  );
}

export default App;
