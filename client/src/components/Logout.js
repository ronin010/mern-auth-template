import React, {Fragment} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../actions/authActions";
import {NavLink} from "reactstrap";

function Logout(props) {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <NavLink onClick={() => dispatch(logout())} href="#">
        Logout
      </NavLink>
    </Fragment>
  )
}

export default Logout;