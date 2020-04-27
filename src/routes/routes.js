import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

export const routes = [
    {
        isExact: true,
        path: '/',
        name: 'Home',
        component: Home,
        isPrivate: true
    },
];

export const authorizationRoutes = [
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