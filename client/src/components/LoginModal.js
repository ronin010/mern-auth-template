import React, {Component} from "react";
import {connect} from "react-redux";
import {login} from "../actions/authActions";
import {clearError} from "../actions/errorActions";
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

class LoginModal extends Component {
  state = {
    email: "",
    password: "",
    modal: false,
  }

  componentDidUpdate() {
    const {isAuthenticated} = this.props;

    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  toggle = () => {
    this.props.clearError();
    this.setState({modal: !this.state.modal})
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    const user = {email, password};
    this.props.login(user);
  }

  render(){
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
          {this.props.error.msg.msg ? <Alert color="danger">{this.props.error.msg.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email:</Label>
                <Input onChange={this.onChange} type="email" name="email" id="email" placeholder="Email" className="mb-3"></Input>
                <Label for="password">Password</Label>
                <Input onChange={this.onChange} type="password" name="password" id="password" placeholder="Password" className="mb-3"></Input>
                <Button
                    color="dark"
                    style={{marginTop: "2rem"}}
                    block
                  >Login</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {login, clearError})(LoginModal);