import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import order from '@/components/order.vue'
import us from '@/components/us.vue'
import search from '@/components/search.vue'
import login from '@/components/login.vue'
import register from '@/components/register.vue'
import details from '@/components/details.vue'
import food from '@/components/food.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:"/index"
    },
    {
    	path:"/index",
    	component:index
    },
    {
    	path:"/order",
    	component:order
    },
    {
    	path:"/us",
    	component:us
    },
    {
    	path:"/search",
    	component:search
    },
    {
    	path:"/login",
    	component:login
    },
    {
    	path:"/register",
    	component:register
    },
    {
    	path:"/food/:id",
    	component:food
    },
    {
    	path:"/details/:id",
    	component:details
    }
  ]
})
