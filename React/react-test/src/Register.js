import React from 'react';
//import '../public/styles/App.css'
//import Header from "./header.js"
import Axios from 'axios'

class Login extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            username: '',
            password: '',
            confirm_password: ''
        };
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      const url = 'http://localhost:4000/register';

      const user = {
          username: this.state.username, 
          password: this.state.password,
          confirm_password: this.state.confirm_password
      }

      console.log("username=" + user.username);
      console.log("password=" + user.password);
      console.log("confirm_password=" + user.confirm_password);

      if(user.password === user.confirm_password){
        Axios.post(url, user).then((res) => {
          if (res.data.allowLogin) {
              console.log('Login Succesfull');
              console.log(res.data.userID); 
                console.log(res.data.userRole);
                localStorage.setItem('ID', res.data.userID);
                localStorage.setItem('Role', res.data.userRole);
              this.props.history.push("/user");
          }
        }).catch((e) => {
          console.log("error");
      });
      }else{
        console.log("The password not matches");
      }
    }

    render() {
        return (
            <div style={{border:"none"}}>
                <br></br>
                <br></br>
                <div style={{background:"white"}}>
                    <center>
                    <form onSubmit={this.handleSubmit}>
                        <br></br>
                        Username: <br></br>
                        <input type = "text" onChange={this.handleInputChange} name= "username"></input>
                        <br></br>
                        <br></br>
                        Password: <br></br>
                        <input type = "password" name = "password" onChange={this.handleInputChange}></input>
                        <br></br>
                        <br></br>
                        Confirm Password: <br></br>
                        <input type = "password" name = "confirm_password" onChange={this.handleInputChange}></input>
                        <br></br>
                        <br></br>
                        <input type = "submit" value = "Register"></input>
                        <br></br>
                    </form>
                  </center>
                    <br></br>
                </div>
            </div>
        );
    } 
}

export default Login;