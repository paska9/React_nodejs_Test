import React from 'react';
import Axios from 'axios'


class Login extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            username: '',
            password: ''
        };
    }

    handleInputChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {

        e.preventDefault();

        const url = 'http://localhost:4000/login';

        const user = {
            username: this.state.username, 
            password: this.state.password
        }

        console.log("username=" + user.username);
        console.log("password=" + user.password);

        Axios.post(url, user).then((res) => {
            if (res.data.allowLogin) {
                console.log('Login Succesfull');
                console.log(res.data.userID); 
                console.log(res.data.userRole);

                localStorage.setItem('loggedIn', true);
                localStorage.setItem('ID', res.data.userID);
                localStorage.setItem('Role', res.data.userRole);
                
                this.props.history.push("/user");
            }
            else {
                console.log('Wrong username or password.');
            }
        }).catch((e) => {
            console.log("error");
        });
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
                        <input type = "submit" value = "Log-in"></input>
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