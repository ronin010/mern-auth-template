import React, {Component} from "react";
import {connect} from "react-redux";
import {register} from "../actions/authActions";
import {clearError} from "../actions/errorActions";
import PropTypes from "prop-types";

import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert 
} from 'reactstrap';

class RegisterModal extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    modal: false,
    msg: ""
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired
  }
  
  componentDidUpdate() {
    const {isAuthenticated} = this.props;

    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }
  
  toggle = () => {
    this.props.clearError();
    this.setState({modal: !this.state.modal});
  };

  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value});
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password} = this.state;
    const newUser = {name, email, password};
    this.props.register(newUser);
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
          {this.props.error.msg.msg ? <Alert color="danger">{this.props.error.msg.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input onChange={this.onChange} type="text" name="name" id="name" placeholder="name" className="mb-3"></Input>
                <Label for="email">Email:</Label>
                <Input onChange={this.onChange} name="email" type="email" id="email" placeholder="email" className="mb-3"></Input>
                <Label for="password">Password:</Label>
                <Input onChange={this.onChange} type="password" name="password" id="password" placeholder="password" className="mb-3"></Input>
                <Button
                    color="dark"
                    style={{marginTop: "2rem"}}
                    block
                  >Register</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register, clearError})(RegisterModal);