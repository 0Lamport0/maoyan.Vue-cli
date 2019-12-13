import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from "pages/index/Layout"

import Movies from "pages/index/movies/Movies"
import Intheaters from "pages/index/movies/Intheaters"
import Comingsoon from "pages/index/movies/Comingsoon"

import Profile from 'pages/index/Profile'
import Theaters from 'pages/index/Theaters'
import Details from 'pages/details/Details'
import City from "pages/city/City"

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/index/movies'
}, {
  path: "/index",
  name: "index",
  component: Index,
  children: [{
    path: "movies",
    name: "movies",
    redirect:"/index/movies/intheaters",
    component: Movies,
    children: [{
      path: "intheaters",
      name: "intheaters",
      component: Intheaters
    }, {
      path: "comingsoon",
      name: "comingsoon",
      component: Comingsoon
    }]
  }, {
    path: "theaters",
    name: "theaters",
    component: Theaters
  }, {
    path: "profile",
    name: "profile",
    component: Profile
  }]
}, {
  path: "/details",
  name: "details",
  component: Details
},{
  path: "/city",
  name: "city",
  component: City
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return desired position
  }
})

export default router