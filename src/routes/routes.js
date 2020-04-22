import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Authentication from '../components/Authentication';

export default [
    {
        isExact: true,
        path: '/',
        name: 'Home',
        component: Authentication(Home),
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
    },

    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },
];