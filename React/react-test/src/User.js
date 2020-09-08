import React from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


class User extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
          usersdata: [],
          loggedIn: localStorage.getItem('loggedIn'),
          Role: localStorage.getItem('Role')
        };
        
    }

    async componentDidMount() {
      const url = 'http://localhost:4000/getUsers';
  
      const user = {
          ID: localStorage.getItem('ID')
      }

      if (this.state.Role == 'internal') {
        Axios.get(url, user).then((res) => {
          console.log('Executed Succesfull');
          console.log(res.data.users);
          let usersdata =  res.data.users;
          this.setState({usersdata: usersdata})
        }).catch((e) => {
            console.log("error");
        });
      }
    }

    createnewuser = (e) => {
      console.log("sdfsdfg");
      this.props.history.push('/create');
  }



    render() {
      function handleClick(id) {
        const url = 'http://localhost:4000/deleteUser';
  
        const user = {
            ID: id
        }
  
        Axios.post(url, user).then((res) => {
          console.log('Deleted Succesfull');
          window.location.reload(); 
        }).catch((e) => {
            console.log("error");
        });
      }
    

        return (
          <div>
            { this.state.loggedIn ? <h2>User Page</h2> : <h3>You are not allowed to see this page.</h3> }
            <h6 style={{marginTop: -20}}>{this.state.loggedIn ? '('+this.state.Role+')' : <br></br>}</h6>
            <h2>{this.state.Role  == 'external' ? 'External role don\'t see all users' : ''}</h2>
            <div>
            <table>
              <thead>
              {this.state.Role == 'internal' ? <tr><th>username</th><th>role</th><th></th></tr>
                 : <tr></tr>}
                
              </thead>
              <tbody>
                { this.state.usersdata.map(function (item, index) {
                  return (
                    <tr key={item.id}>
                      <td>{item.user.username}</td>
                      <td>{item.user.role}</td>
                      <td><button onClick={() => handleClick(item.id)}>
                        Delete
                      </button></td>
                    </tr>
                  );
                })}
              </tbody>
              <br></br>
              {this.state.Role == 'internal' ? <button onClick={this.createnewuser} style={{marginLeft: 30}}>Add new User</button>
                 : <br></br>}
              
            </table>
            </div>
          </div>
        );
    } 
}

export default User;