import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import Logout from "./Logout";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';

const navItemStyles = {
  marginRight: "10px"
}

class AppNavBar extends Component {
  state = {
    isOpen: false
  }

  // the toggle function will be used to open and close the menu
  // it will set the isOpen state variable to the opposite of its current value
   toggle = () => {
     this.setState({isOpen: !this.state.isOpen})
   }

  render() {
    const guestLinks = (
      <Fragment>
        <NavItem style={navItemStyles}>
          <RegisterModal  />
        </NavItem>
        <NavItem style={navItemStyles}>
          <LoginModal  />
        </NavItem>
      </Fragment>
    )

    const authLinks = (
      <Fragment>
        <NavItem style={navItemStyles}>
          <Logout  />
        </NavItem>
      </Fragment>
    )
  
    return (
      <div>
        <Navbar style={{fontSize: "20px", cursor: "pointer"}} className="navbar" color="light" light expand="sm">
          <Container>
          <NavbarBrand style={{fontSize: "24px"}} href="#">React Auth App</NavbarBrand>
          <NavbarToggler onClick={this.toggle}></NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.props.isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(AppNavBar);