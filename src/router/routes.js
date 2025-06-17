const routes = [

  {
    path: '/',
    component: () => import('pages/CashSaved.vue')
  },
  {
    path: '/Categorias',
    component: () => import('pages/Categorias.vue')
  },
  {
    path: '/EmConstrucao',
    component: () => import('pages/LoandingPage.vue')
  },
  {
    path: '/Contas',
    component: () => import('pages/Contas.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
