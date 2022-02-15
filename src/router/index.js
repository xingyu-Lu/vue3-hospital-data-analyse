import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
	},
    {
      path: '/',
      redirect: '/introduce'
    },
	// dashboard
    {
      path: '/introduce',
      name: 'introduce',
      component: () => import('../views/Introduce.vue')
    },
	// 系统管理
	{
		path: '/admin',
		name: 'admin',
		component: () => import('../views/admin/index.vue')
	},
	{
		path: '/admin-add',
		name: 'admin_add',
		component: () => import('../views/admin/add.vue')
	},
	{
		path: '/admin-changepwd',
		name: 'change_pwd',
		component: () => import('../views/admin/changepwd.vue')
	},
	{
		path: '/menu',
		name: 'menu',
		component: () => import('../views/menu/index.vue')
	},
	{
		path: '/menu-add',
		name: 'menu_add',
		component: () => import('../views/menu/add.vue')
	},
	// 角色管理
	{
		path: '/role',
		name: 'role',
		component: () => import('../views/role/index.vue'),
	},
	{
		path: '/role-add',
		name: 'role_add',
		component: () => import('../views/role/add.vue'),
	},
	// 更新记录
	{
		path: '/update_log',
		name: 'update_log',
		component: () => import('../views/update_log.vue')
	},
	// 开单收入
	{
		path: '/billing-income',
		name: 'billing_income',
		component: () => import('../views/operate_stat/billing_income/index.vue')
	},
	// 接单收入
	{
		path: '/receive-income',
		name: 'receive_income',
		component: () => import('../views/operate_stat/receive_income/index.vue')
	},
  ]
})

export default router