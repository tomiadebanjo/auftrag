import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'Pages/Login';
import OrderDetailView from 'Pages/OrderDetailView';
import OrdersView from 'Pages/OrdersView';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/orders/:id">
          <OrderDetailView />
        </Route>
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
