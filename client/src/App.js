import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'Pages/Login';
import OrderDetailView from 'Pages/OrderDetailView';
import OrdersView from 'Pages/OrdersView';
import { UserProvider } from 'Context/user.context';
import PrivateRoute from 'Components/PrivateRoute';
import ServerDown from 'Pages/ServerDown';

function App() {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <PrivateRoute path="/orders/:id">
            <OrderDetailView />
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <OrdersView />
          </PrivateRoute>
          <Route exact path="/server-error">
            <ServerDown />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </UserProvider>
      </Switch>
    </Router>
  );
}

export default App;
