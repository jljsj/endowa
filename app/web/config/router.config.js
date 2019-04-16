export default [
  // user 
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './admin/Login' },
    ],
  },
  // admin
  {
    path: '/admin',
    component: '../layouts/AdminLayout',
    Routes: ['src/pages/admin'],
    routes: [
      { path: '/admin', redirect: '/admin/dashboard' },
      { path: '/admin/dashboard', component: './admin/Dashboard' },
      { path: '/admin/basic', component: './admin/Basic/index' },
      {
        path: '/admin/about',
        name: 'about',
        routes: [
          { path: '/admin/about', redirect: '/admin/about/introduce', },
          {
            path: '/admin/about/introduce',
            component: './admin/About/index',
          },
          {
            path: '/admin/about/team',
            component: './admin/Team/index',
          },
          {
            path: '/admin/about/team/:id',
            component: './admin/Team/New',
          },
          {
            path: '/admin/about/contact',
            component: './admin/About/Contact',
          },
          {
            path: '/admin/about/history',
            component: './admin/About/History/index',
          },
          {
            path: '/admin/about/history/:id',
            component: './admin/About/History/New',
          },
          {
            path: '/admin/about/honor',
            component: './admin/About/Honor/index',
          },
          {
            path: '/admin/about/honor/:id',
            component: './admin/About/Honor/New',
          },
          {
            component: '404',
          },
        ]
      },
      {
        path: '/admin/job',
        name: 'job',
        routes: [
          { path: '/admin/job', redirect: '/admin/job/post', },
          {
            path: '/admin/job/postClassify',
            component: './admin/Job/Classify/index',
          },
          {
            path: '/admin/job/postClassify/:id',
            component: './admin/Job/Classify/New',
          },
          {
            path: '/admin/job/post',
            component: './admin/Job/Post/index',
          },
          {
            path: '/admin/job/post/:id',
            component: './admin/Job/Post/New',
          },
          {
            component: '404',
          },
        ]
      },
      {
        path: '/admin/info',
        name: 'news',
        routes: [
          { path: '/admin/info', redirect: '/admin/info/news', },
          {
            path: '/admin/info/newsClassify',
            component: './admin/Info/Classify/index',
          },
          {
            path: '/admin/info/newsClassify/:id',
            component: './admin/Info/Classify/New',
          },
          {
            path: '/admin/info/news',
            component: './admin/Info/News/index',
          },
          {
            path: '/admin/info/news/:id',
            component: './admin/Info/News/New',
          },
          {
            component: '404',
          },
        ]
      },
      {
        path: '/admin/products',
        name: 'products',
        routes: [
          { path: '/admin/products', redirect: '/admin/products/product', },
          {
            path: '/admin/products/productClassify',
            component: './admin/Products/Classify/index',
          },
          {
            path: '/admin/products/productClassify/:id',
            component: './admin/Products/Classify/New',
          },
          {
            path: '/admin/products/product',
            component: './admin/Products/Product/index',
          },
          {
            path: '/admin/products/product/:id',
            component: './admin/Products/Product/New',
          },
          {
            path: '/admin/products/service',
            component: './admin/Products/Service',
          },
          {
            component: '404',
          },
        ]
      },
      {
        path: '/admin/partner',
        name: 'partner',
        routes: [
          {
            path: '/admin/partner',
            component: './admin/Partner/index',
          },
          {
            path: '/admin/partner/:id',
            component: './admin/Partner/New',
          },
          {
            component: '404',
          },
        ]
      },
      {
        path: '/admin/user',
        name: 'user',
        routes: [
          {
            path: '/admin/user',
            component: './admin/User/index',
          },
          {
            path: '/admin/user/:id',
            component: './admin/User/New',
          },
          {
            component: '404',
          },
        ]
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './site/Home' },
      {
        path: '/product', component: './site/Product/index', routes: [
          { path: '/product', component: './site/Product/Page' },
          { path: '/product/:id', component: './site/Product/Detailed' },
        ]
      },
      {
        path: '/news', component: './site/News/index', routes: [
          { path: '/news', component: './site/News/Page' },
          { path: '/news/:id', component: './site/News/Detailed' },
        ]
      },
      {
        path: '/about', component: './site/About/index',
      },
      {
        component: '404',
      },
    ],
  },
];
