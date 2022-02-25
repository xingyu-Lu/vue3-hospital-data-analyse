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
			<el-table-column prop="date" label="日期" />
			<el-table-column prop="billing_income" label="开单收入" />
			<el-table-column prop="direct_cost" label="直接成本" />
			<el-table-column prop="balance" label="收支结余" />
			<el-table-column prop="balance_rate" label="结余率" />
			<el-table-column prop="drug_income" label="药品收入" />
			<el-table-column prop="consumable_income" label="耗材收入" />
			<el-table-column prop="drug_pay" label="药品支出" />
			<el-table-column prop="consumable_pay" label="耗材支出" />
			<el-table-column prop="drug_rate" label="药占比" />
			<el-table-column prop="consumable_rate" label="耗占比" />
			<el-table-column prop="drug_profit" label="药品利润" />
			<el-table-column prop="consumable_profit" label="耗材利润" />
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
				getIndicator()
			})
	
			onUnmounted(() => {

			})
	
			const getIndicator = () => {
				state.loading = true
				axios.get('/api/back/indicators', {
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
				getIndicator()
			}
	
			const handleExport = () => {
				axios.get('/api/back/indicators/export', {
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
					link.setAttribute('download', state.office_name + '-重点指标-' + start_date + '-' + end_date +
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
