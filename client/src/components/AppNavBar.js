import React, {useState, Fragment} from "react";
import {useSelector} from "react-redux";
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

function AppNavBar(props) {
  // declare the component state variables
  // isOpen will be the variable to track whether the nav menu is open (for mobile view)
  // setIsOpen is the function to change the value of isOpen
  const [isOpen, setIsOpen] = useState(false);

  // the toggle function will be used to open and close the menu
  // it will set the isOpen state variable to the opposite of its current value
  const toggle = () => setIsOpen(!isOpen);

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

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div>
      <Navbar style={{fontSize: "20px", cursor: "pointer"}} className="navbar" color="light" light expand="sm">
        <Container>
        <NavbarBrand style={{fontSize: "24px"}} href="#">React Auth App</NavbarBrand>
        <NavbarToggler onClick={toggle}></NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavBar;