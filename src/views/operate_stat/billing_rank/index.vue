<template>
	<el-card style="min-height: 100%;">
		<template #header>
			<div>
				<el-select v-model="office_name" placeholder="请选择" filterable
					style="margin-bottom: 20px; margin-right: 10px;">
					<el-option v-for="item in office_list" :key="item.id" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
				<el-date-picker v-model="date" type="monthrange" range-separator="-" start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
				<el-button type="primary" @click="handleOption" style="margin-left: 10px;">搜索</el-button>
				<el-button type="primary" @click="handleExport">导出Excel</el-button>
			</div>
		</template>
		
		<el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
			<el-table-column prop="rank" label="金额排名" width="100" />
			<el-table-column prop="charge_name" label="收费项目名称" width="800" />
			<el-table-column prop="money" label="金额(元)" />
			<el-table-column prop="ratio" label="占科室收入比例" />
		</el-table>
	</el-card>
</template>

<script>
	import {
		Plus
	} from '@element-plus/icons-vue'
	import {
		onMounted,
		onUnmounted,
		reactive,
		ref,
		toRefs
	} from 'vue'
	import axios from '@/utils/axios'
	import {
		useRouter,
		useRoute
	} from 'vue-router'
	import { sessionGet } from '@/utils'
	
	let office_name = sessionGet('userinfo')['name']
	if (office_name == 'root') {
		office_name = '口腔科'
	}
	
	export default {
		name: 'admin-list',
		setup() {
			const value1 = ref(true)
			const multipleTable = ref(null)
			const router = useRouter()
			const state = reactive({
				date: [new Date().getFullYear() + '-' + new Date().getMonth(), new Date().getFullYear() + '-' + (
					new Date().getMonth() + 1)],
				office_name: office_name,
				office_list: [],
				charge_subclass: '',
				loading: false,
				tableData: [], // 数据列表
				multipleSelection: [], // 选中项
			})
			onMounted(() => {
				getOffice()
				getBillingRank()
			})
	
			onUnmounted(() => {

			})
	
			const getBillingRank = () => {
				state.loading = true
				axios.get('/api/back/billingRanks', {
					params: {
						office_name: state.office_name,
						date: state.date,
					}
				}).then(res => {
					state.tableData = res.data
					state.loading = false
				})
			}
	
			const getOffice = () => {
				axios.get('/api/back/offices', {
					params: {
						is_lc: 1,
						indicator: 1
					}
				}).then(res => {
					state.office_list = res.data
					// state.office_name = res.data[0].value
				})
			}
	
			const handleOption = () => {
				getBillingRank()
			}
	
			const handleExport = () => {
				axios.get('/api/back/billingRanks/export', {
					params: {
						office_name: state.office_name,
						date: state.date,
					},
					responseType: 'blob'
				}).then(result => {
					let blob = new Blob([result], {
						type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
					});
					let url = window.URL.createObjectURL(blob)
					let link = document.createElement('a')
					link.style.display = 'none'
					link.href = url
					link.setAttribute('id', 'downloadLink')
					let start_date = new Date(state.date[0]).getFullYear() + '/' + (new Date(state.date[0])
						.getMonth() + 1)
					let end_date = new Date(state.date[1]).getFullYear() + '/' + (new Date(state.date[1])
						.getMonth() + 1)
					link.setAttribute('download', state.office_name + '-开单排名-' + start_date + '-' + end_date +
						'.xlsx');
					document.body.appendChild(link)
					link.click()
	
					// 删除添加的a链接
					let objLink = document.getElementById('downloadLink')
					document.body.removeChild(objLink)
				})
			}
	
			return {
				...toRefs(state),
				handleOption,
				handleExport,
				Plus,
			}
		}
	}
</script>

<style>
</style>
