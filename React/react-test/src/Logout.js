import React from 'react';
import Axios from 'axios'


class Logout extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('ID');
        localStorage.removeItem('Role');
        this.props.history.push('/');
    }
    render() {
        return (
            <div style={{border:"none"}}>
                <h2>Logging Out</h2>
            </div>
        );
    }
}

export default Logout;