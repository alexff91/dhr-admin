export default [
  // ## login page
  {
    path: '/login',
    meta: {requiresAuth: false},
    component: () => import(/* webpackChunkName: 'login' */ '../views/login')
  },
  {
    path: '/',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: 'common' */ '../views/layout'),
    children: [
      {
        path: '',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: 'vacancies' */ '../views/pages/vacancies')
      },
      {
        path: 'vacancies/:vacancyId',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: 'new-vacancy' */ '../views/pages/vacancy-edit')
      },
      {
        path: 'new-vacancy',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: 'new-vacancy' */ '../views/pages/vacancy-create')
      }
    ]
  },
  {
    path: '*',
    meta: {requiresAuth: false},
    component: () => import(/* webpackChunkName: 'common' */ '../views/error')
  }
];
