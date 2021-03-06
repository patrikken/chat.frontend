import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewMessage from './views/NewMessage.vue'  
import ChatBox from './views/ChatBox.vue'  
import Welcome from './views/Welcome.vue'  
 

Vue.use(Router) 
export default new Router({
  routes: [
    {
      path: '/home/',
      name: 'home',
      component: Home
    },
    {
      path: '/about/',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path : '/new',
      name : '/new-message',
      component : NewMessage,
    },
    {
      path : '/chat',
      name : 'ChatBox',
      component : ChatBox,
    },
    {
      path : '/',
      name : 'welcome',
      component : Welcome,
    }
  ]
})
