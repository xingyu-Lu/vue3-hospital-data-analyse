export function sessionGet(key) {
	const value = window.sessionStorage.getItem(key)
	try {
		return JSON.parse(window.sessionStorage.getItem(key))
	} catch (error) {
		return value
	}
}

export function sessionSet(key, value) {
	window.sessionStorage.setItem(key, JSON.stringify(value))
}

export function sessionRemove(key) {
	window.sessionStorage.removeItem(key)
}

// 判断内容是否含有表情字符，现有数据库不支持。
export function hasEmoji(str = '') {
	const reg =
		/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
	return str.match(reg) && str.match(reg).length
}
import config from '~/config'

// 单张图片上传
// export const uploadImgServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/file'
export const uploadImgServer = config[import.meta.env.MODE].baseUrl + '/api/back/files/upload'
// 多张图片上传
// export const uploadImgsServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/files'
export const uploadImgsServer = config[import.meta.env.MODE].baseUrl + '/api/back/files/upload'


export const pathMap = {
	login: '登录',
	introduce: '系统介绍',
	update_log: '更新记录',

	// 系统管理
	admin: '管理员列表',
	admin_add: '管理员',
	menu: '菜单列表',
	menu_add: '菜单',
	change_pwd: '修改密码',
	role: '角色管理',
	role_add: '角色管理',
	
	// 运营统计
	billing_income: '开单收入',
	receive_income: '接单收入',
	pay: '支出明细',
	indicator: '重点指标',
	cost_control: '成本控制',
}
