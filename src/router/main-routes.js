import demo from './demo-routes';

export default [
  // - Dashboard
  {
    name: 'dashboard',
    path: '',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: 'dashboard' */ '../views/main/index')
  },
  {
    name: 'about',
    path: 'about',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: 'about' */ '../views/main/about')
  },
  {
    name: 'profile',
    path: 'profile',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: 'users' */ '../views/main/profile')
  },
  // - Posts
  {
    name: 'vacancies',
    path: 'vacancies/:type',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: 'posts' */ '../views/main/vacancies')
  },
  {
    name: 'new',
    path: 'new/:type',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: 'posts' */ '../views/main/new')
  },
  // - Users
  {
    name: 'users',
    path: 'users/:page?',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: 'users' */ '../views/main/users')
  },
  {
    name: 'roles',
    path: 'roles',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: 'users' */ '../views/main/roles')
  },
  {
    name: 'permissions',
    path: 'permissions',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: 'users' */ '../views/main/permissions')
  },
  // - Comments
  {
    name: 'responds',
    path: 'responds',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: 'comments' */ '../views/main/responds')
  },
  // - Options
  {
    name: 'settings',
    path: 'settings/:type',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: 'options' */ '../views/main/settings')
  }
].concat(demo);