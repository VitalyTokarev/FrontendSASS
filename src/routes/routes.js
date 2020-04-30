import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AdminPanel from '../pages/AdminPanel'

export const routes = [
    {
        isExact: true,
        path: '/',
        name: 'Home',
        component: Home,
        isPrivate: true,
    },
];

export const adminRoute = {
    path: '/admin_panel',
    name: 'AdminPanel',
    component: AdminPanel,
    isPrivate: true,
}

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