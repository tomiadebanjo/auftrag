import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'Pages/Login';
import OrderDetailView from 'Pages/OrderDetailView';
import OrdersView from 'Pages/OrdersView';
import { UserProvider } from 'Context/user.context';
import PrivateRoute from 'Components/PrivateRoute';

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/orders/:id">
            <OrderDetailView />
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <OrdersView />
          </PrivateRoute>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
