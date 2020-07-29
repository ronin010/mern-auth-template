import React, {Component} from "react";
import {Container} from 'reactstrap';
import {connect} from "react-redux";
import {loadUser} from "../actions/authActions";

class Header extends Component {

  render() {
    return (
      <Container style={{textAlign: "center"}} className="mt-3">
        {this.props.isAuthenticated ? <h3>Welcome to the site {this.props.user.name}!</h3> : <h4>Login or Register to continue.</h4>}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, {loadUser})(Header);