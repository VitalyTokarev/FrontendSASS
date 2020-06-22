import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AdminPanel from '../pages/AdminPanel';
import Autorization from '../components/hoc/Authorization';

export const routes = [
    {
        isExact: true,
        path: '/',
        name: 'Home',
        component: Autorization(Home),
    },

];

export const adminRoute = {
    path: '/admin_panel',
    name: 'AdminPanel',
    component: AdminPanel,
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