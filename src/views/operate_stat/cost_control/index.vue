<template>
	<el-card style="min-height: 100%;">
		<template #header>
			<div>
				<el-select v-model="office_name" placeholder="请选择" filterable
					style="margin-bottom: 20px; margin-right: 10px;">
					<el-option v-for="item in office_list" :key="item.id" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
				<el-date-picker v-model="date" type="monthrange" range-separator="至" start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
				<el-button type="primary" @click="handleOption" style="margin-left: 10px;">搜索</el-button>
				<el-button type="primary" @click="handleExport">导出Excel</el-button>
			</div>
		</template>
		
		<h1 style="text-align: center; margin-bottom: 40px;">{{ head }}</h1>
		
		<div id="zoom"></div>
		
		<el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
			<el-table-column prop="date" label="日期" />
			<el-table-column prop="personnel_cost" label="人员经费" />
			<el-table-column prop="consumable_cost" label="耗材支出" />
			<el-table-column prop="drug_cost" label="药品费" />
			<el-table-column prop="fixed_asset_cost" label="固定资产折旧费" />
			<el-table-column prop="other_cost" label="其他支出" />
			<el-table-column prop="total_cost" label="合计" />
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
	import * as echarts from 'echarts';
	
	let myChart = null
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
				date: [new Date().getFullYear() + '-' + 1, new Date().getFullYear() + '-' + (
					new Date().getMonth() + 1)],
				office_name: office_name,
				office_list: [],
				charge_subclass: '',
				loading: false,
				tableData: [], // 数据列表
				multipleSelection: [], // 选中项
				head: '',
				
				// 图标配置项和数据
				option: {
					title: {
						text: ''
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
						data: []
					},
					toolbox: {
						show: true,
						orient: 'vertical',
						left: 'right',
						// top: 'center',
						feature: {
							// mark: {
							// 	show: true
							// },
							// dataView: {
							// 	show: true,
							// 	readOnly: false
							// },
							// magicType: {
							// 	show: true,
							// 	type: ['line', 'bar', 'stack']
							// },
							// restore: {
							// 	show: true
							// },
							saveAsImage: {
								show: true
							}
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						// boundaryGap: false,
						data: []
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
						name: 'Email',
						type: 'line',
						// stack: 'Total',
						label: {
							show: true,
							position: 'top'
						},
						smooth: true,
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [120, 132, 101, 134, 90, 230, 210]
					}, {
						name: 'Email',
						type: 'line',
						// stack: 'Total',
						label: {
							show: true,
							position: 'top'
						},
						smooth: true,
						areaStyle: {},
						emphasis: {
							focus: 'series'
						},
						data: [120, 132, 101, 134, 90, 230, 210]
					}, ]
				},
			})
			onMounted(() => {
				getOffice()
				getCostControl()
				
				// 基于准备好的dom，初始化echarts实例
				myChart = echarts.init(document.getElementById('zoom'))
			})
	
			onUnmounted(() => {
				myChart.dispose()
			})
	
			const getCostControl = () => {
				state.loading = true
				axios.get('/api/back/costControls', {
					params: {
						office_name: state.office_name,
						date: state.date,
					}
				}).then(res => {
					state.head = res.data.head
					state.tableData = res.data.data
					state.loading = false
					
					// 科室折线图
					myChart.dispose()
					myChart = echarts.init(document.getElementById('zoom'))
					// state.option.title.text = res.data.title
					state.option.legend.data = res.data.line_chart.legend_data
					state.option.xAxis[0].data = res.data.line_chart.series_date
					state.option.series[0].name = res.data.line_chart.series_name
					state.option.series[0].data = res.data.line_chart.series_data
					
					// 全院(临床)折现图
					// state.option.xAxis[0].data = res.data.line_chart_qy.series_date
					state.option.series[1].name = res.data.line_chart_qy_lc.series_name
					state.option.series[1].data = res.data.line_chart_qy_lc.series_data
					myChart.setOption(state.option)
				})
			}
	
			const getOffice = () => {
				axios.get('/api/back/offices', {
					params: {
						is_lc: 1,
						cost_control: 1,
						type: 1
					}
				}).then(res => {
					state.office_list = res.data
					// state.office_name = res.data[0].value
				})
			}
	
			const handleOption = () => {
				getCostControl()
			}
	
			const handleExport = () => {
				axios.get('/api/back/costControls/export', {
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
					link.setAttribute('download', state.office_name + '-成本控制-' + start_date + '-' + end_date +
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

<style scoped>
	#zoom {
		min-height: 600px;
		margin-bottom: 20px;
	}
</style>
