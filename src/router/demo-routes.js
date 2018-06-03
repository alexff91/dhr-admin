export default [
  // ## demo views
  {
    name: 'demo',
    path: 'demo',
    meta: {requiresAuth: false},
    component: () => import(/* webpackChunkName: 'demo' */ '../views/demo/index')
  },
  // ## component views
  {
    name: 'components',
    path: 'components',
    meta: {requiresAuth: false},
    component: () => import(/* webpackChunkName: 'components' */ '../views/demo/components/index')
  },
  {
    name: 'components-icons',
    path: 'components/icons',
    meta: {requiresAuth: false},
    component: () => import(/* webpackChunkName: 'components' */ '../views/demo/components/icons')
  },
  {
    name: 'components-button',
    path: 'components/button',
    meta: {requiresAuth: false},
    component: () => import(/* webpackChunkName: 'components' */ '../views/demo/components/button')
  },
  {
    name: 'components-table',
    path: 'components/table',
    meta: {requiresAuth: false},
    component: () => import(/* webpackChunkName: 'components' */ '../views/demo/components/table')
  }
];
