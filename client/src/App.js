import Login from 'Pages/Login';
import OrdersView from 'Pages/OrdersView';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/orders">
          <OrdersView />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
