import React, {Component} from 'react';
import './App.css';
import AppNavBar from "./components/AppNavBar";
import {Provider} from "react-redux";
import store from "./store";
import {Container} from 'reactstrap';
import MainHeader from "./components/MainHeader";
import {loadUser} from "./actions/authActions";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar  />
          <Container>
            <MainHeader  />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
