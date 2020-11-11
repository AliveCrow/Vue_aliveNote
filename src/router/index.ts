import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '../views/Home.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        redirect:'/note',
        meta: {
            requireAuth: true
        },
        component: Home,
        children: [
        {
            path: '/note',
            name: 'Note',
            component: () => import('@/components/Home/ContainerBoxRight.vue')
            }
        ]
    },
    {
        path: '/userInfo',
        name: 'UserInfo',
        component: () => import('@/views/UserInfo.vue')
    },
    {
        path: '/rel',
        // name: 'Rel',
        redirect: '/login',
        component: () => import('@/views/Container.vue'),
        children: [
            {
                path: '/login',
                name: 'Login',
                meta: {
                    requireAuth: false
                },
                component: () => import('@/components/Login.vue')
            },
            {
                path: '/register',
                name: 'Register',
                meta: {
                    requireAuth: false
                },
                component: () => import('@/components/Register.vue')
            },
            {
                path: '/forgotPassword',
                name: 'forgotPassword',
                meta: {
                    requireAuth: false
                },
                component: () => import('@/components/ForgotPassword.vue')
            }
        ]
    },
    {
        path: '/test',
        name: 'TSET',
        component: () => import('@/components/test.vue')
    },
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (localStorage.getItem('jwt_token')) {


            next();
        } else {
            alert('token不存在');
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        }
    } else {
        next();
    }
});

export default router;
