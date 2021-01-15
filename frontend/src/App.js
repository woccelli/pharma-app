// General
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
// Local
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "./App.css"
// Redux
import { Provider } from "react-redux";
import store from "./store";
// Components
import Container from 'react-bootstrap/Container'
// Pages
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Account from "./components/user/Account";
import Subscribe from "./components/auth/Subscribe";
import PrivateRoute from "./components/private-route/PrivateRoute";
import AdminRoute from "./components/private-route/AdminRoute"
import Dashboard from "./components/layout/Dashboard";
import SheetForm from "./components/admin/SheetForm";
import AddUser from "./components/admin/AddUser"
import Users from "./components/admin/Users";
import Sheets from "./components/admin/Sheets";
import Header from "./components/layout/modules/Header"
import NameForm from "./components/user/NameForm"
import EmailForm from "./components/user/EmailForm"
import AddressForm from "./components/user/AddressForm"
import DeleteForm from "./components/user/DeleteForm"
import UserSubscription from "./components/admin/UserSubscription";
import PwdForm from "./components/user/PwdForm"
import ResetPwd from "./components/auth/ResetPwd"
import ForgottenPwd from "./components/auth/ForgottenPwd"
import SendSheet from "./components/layout/SendSheet";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container className="h-100">
            <Header/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgottenPwd}/>
            <Route path="/password-reset/:userId/:token" component={ResetPwd} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/subscribe" component={Subscribe} />
              <PrivateRoute exact path="/send-sheet" component={SendSheet} />
              <PrivateRoute exact path="/account" component={Account} />
              <PrivateRoute exact path="/account/name" component={NameForm} />
              <PrivateRoute exact path="/account/email" component={EmailForm} />
              <PrivateRoute exact path="/account/address" component={AddressForm} />
              <PrivateRoute exact path="/account/password" component={PwdForm} />
              <PrivateRoute exact path="/account/delete" component={DeleteForm} />
            </Switch>
            <AdminRoute exact path="/admin/sheets" component={Sheets} />
            <AdminRoute exact path="/admin/sheets/sheet" component={SheetForm} />
            <AdminRoute exact path="/admin/users" component={Users} />
            <AdminRoute exact path="/admin/users/add-user" component={AddUser} />
            <AdminRoute exact path="/admin/users/user-subscription" component={UserSubscription} />
          </Container>
        </Router>
      </Provider>
    );
  }
} export default App;
