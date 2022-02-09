<template>
	<el-card class="account-container" style="display: flex; justify-content: flex-start; align-items: center;">
		<h1>系统简介</h1>
		<div style="line-height: 30px">
			后台管理系统，基于 Laravel 、Vue 3.0 、Element Plus 相关技术栈开发的医院数据统计分析管理系统。
		</div>
		<h1>主要功能</h1>
		<ul style="font-weight: bold; line-height: 32px;">
			<li>系统管理</li>
			<li>管理员管理</li>
			<li>菜单管理</li>
			<li>角色管理</li>
			<li>权限管理(rbac)</li>
			<li>数据统计分析</li>
		</ul>
		<h1>技术选型</h1>
		<ul style="font-weight: bold; line-height: 32px;">
			<li>Laravel 8.x</li>
			<li>Mysql</li>
			<li>Vue 3.x</li>
			<li>Vue-Router 4.x</li>
			<li>Element-Plus（适配全新 Vue 3.x 的 PC 端组件库）</li>
			<li>axios</li>
		</ul>
	</el-card>
</template>

<script>	
	export default {
		name: 'Introduce'
	}
</script>
<style scoped>

</style>
