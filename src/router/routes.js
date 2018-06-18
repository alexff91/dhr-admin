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
        path: 'vacancies/:vacancyId/edit',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: 'new-vacancy' */ '../views/pages/vacancy-edit')
      },
      {
        path: 'new-vacancy',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: 'new-vacancy' */ '../views/pages/vacancy-create')
      },
      {
        path: 'vacancies/:vacancyId',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: 'new-vacancy' */ '../views/pages/vacancy')
      },
      {
        path: 'responses/:responseId',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: 'new-vacancy' */ '../views/pages/responses')
      },
      {
        path: 'skills',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: 'new-vacancy' */ '../views/pages/skills')
      },
      {
        path: 'company-settings',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: 'new-vacancy' */ '../views/pages/company-settings')
      }
    ]
  },
  {
    path: '*',
    meta: {requiresAuth: false},
    component: () => import(/* webpackChunkName: 'common' */ '../views/error')
  }
];
