import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../screen/login';
import Register from '../screen/register';

const screen = {
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    }
}


const  HomeStack = createStackNavigator(screen);


export default createAppContainer(HomeStack);