import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'Pages/Login';
import OrderDetailView from 'Pages/OrderDetailView';
import OrdersView from 'Pages/OrdersView';
import { UserProvider } from 'Context/user.context';
import PrivateRoute from 'Components/PrivateRoute';
import ServerDown from 'Pages/ServerDown';
import { OrderProvider } from 'Context/order.context';

function App() {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <OrderProvider>
            <PrivateRoute exact path="/orders">
              <OrdersView />
            </PrivateRoute>
            <PrivateRoute path="/orders/:id">
              <OrderDetailView />
            </PrivateRoute>
            <Route exact path="/server-error">
              <ServerDown />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </OrderProvider>
        </UserProvider>
      </Switch>
    </Router>
  );
}

export default App;
