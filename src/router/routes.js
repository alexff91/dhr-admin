export default [
  // ## login page
  {
    path: '/login',
    meta: {requiresAuth: false},
    component: () => import('../views/login')
  },
  {
    path: '/',
    meta: {requiresAuth: true},
    component: () => import('../views/layout'),
    children: [
      {
        path: '',
        meta: {requiresAuth: true},
        component: () => import('../views/pages/vacancies')
      },
      {
        path: 'vacancies/:vacancyId/edit',
        meta: {requiresAuth: true},
        component: () => import('../views/pages/vacancy-edit')
      },
      {
        path: 'new-vacancy',
        meta: {requiresAuth: true},
        component: () => import('../views/pages/vacancy-create')
      },
      {
        path: 'vacancies/:vacancyId',
        meta: {requiresAuth: true},
        component: () => import('../views/pages/vacancy')
      },
      {
        path: 'vacancies/:vacancyId/responses/:responseId',
        meta: {requiresAuth: true},
        component: () => import('../views/pages/responses')
      },
      {
        name: 'review',
        path: 'vacancies/:vacancyId/responses/:responseId/review/',
        meta: {requiresAuth: true},
        component: () => import('../views/pages/review')
      },
      {
        path: 'skills',
        meta: {requiresAuth: true},
        component: () => import('../views/pages/skills')
      },
      {
        name: 'company-settings',
        path: 'company-settings',
        meta: {requiresAuth: true},
        component: () => import('../views/pages/company-settings')
      }
    ]
  },
  {
    path: '*',
    meta: {requiresAuth: false},
    component: () => import('../views/error')
  }
];
