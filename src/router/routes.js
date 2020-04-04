
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Preview.vue') },
      { path: '/main-interest', component: () => import('pages/MainInterest') },
      { path: '/chats', component: () => import('pages/Chats') },
      { path: '/interests', component: () => import('pages/Interests') },
      { path: '/chat', component: () => import('pages/Chat') },
      { name: 'login', path: '/login', component: () => import('pages/Login') },
      { path: '/registration', component: () => import('pages/Registration') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
