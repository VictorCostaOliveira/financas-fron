import Vue from 'vue';
import Router from 'vue-router';
import SignUp from '@/components/SignUp';
import Login from '@/components/Login';
import Home from '@/components/Home';
import EaningsDetail from '@/components/EarningDetail';
import Spendings from '@/components/Spendings';
import SpendingDetail from '@/components/SpendingDetail';
import Goals from '@/components/Goals';
import GoalDetail from '@/components/GoalDetail';
import AuthStore from '@/api/auth';

Vue.use(Router);
const authenticatedRoutes = ['Home', 'EaningsDetail', 'Spendings', 'SpendingDetail', 'Goals', 'GoalDetail'];

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'sign-up',
      component: SignUp,
      meta: {
        needBottom: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        needBottom: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        needBottom: true
      }
    },
    {
      path: '/earnings/:id',
      name: 'EaningsDetail',
      component: EaningsDetail,
      meta: {
        needBottom: true
      }
    },
    {
      path: '/spendings',
      name: 'Spendings',
      component: Spendings,
      meta: {
        needBottom: true
      }
    },
    {
      path: '/spendings/:id',
      name: 'SpendingDetail',
      component: SpendingDetail,
      meta: {
        needBottom: true
      }
    },
    {
      path: '/goals',
      name: 'Goals',
      component: Goals,
      meta: {
        needBottom: true
      }
    },
    {
      path: '/goals/:id',
      name: 'GoalDetail',
      component: GoalDetail,
      meta: {
        needBottom: true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (authenticatedRoutes.some((element, index, array) => {
    return element === to.name
  }) && !AuthStore.getCredentials()) {
    next({ path: '/login' })
  }
  next()
})

export default router
