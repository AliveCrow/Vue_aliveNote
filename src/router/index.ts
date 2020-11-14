import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '../views/Home.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        redirect: '/notes',
        meta: {
            requireAuth: true
        },
        component: Home,
        children: [
            {
                path: '/notes',
                name: 'Notes',
                meta: {
                    requireAuth: true
                },
                component: () => import('@/components/Home/ContainerBoxRight.vue')
            },
            {
                path: '/tags',
                name:'Tags',
                meta: {
                    requireAuth: true
                },
                component:() => import('@/views/TagsManage.vue')
            },
            {
                path: '/archive',
                name:'Archive',
                meta: {
                    requireAuth: true
                },
                component:() => import('@/views/Archive.vue')
            },
            {
                path: '/rec',
                name:'Rec',
                meta: {
                    requireAuth: true
                },
                component:() => import('@/views/Rec.vue')
            }
        ]
    },
    {
        path: '/userInfo',
        name: 'UserInfo',
        meta: {
            requireAuth: true
        },
        component: () => import('@/views/UserInfo.vue')
    },
    {
        path: '/rel',
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
    {
      path:'/transit',
        component: () => import('@/components/Transit.vue')
    },
    {
        path:'*',
        name:'NotFound',
        component:()=>import('@/views/NotFound.vue')
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    Vue.$toast.clear()
    if (to.meta.requireAuth) {
        if (localStorage.getItem('jwt_token')) {
            next();
        } else {
            Vue.$toast.error('token不存在')
            // alert('token不存在');
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
