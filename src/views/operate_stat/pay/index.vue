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
				<!-- <el-input style="width: 200px; margin-top: 20px; margin-right: 10px; margin-left: 10px;"
					placeholder="请输入收费项目" v-model="charge_subclass" clearable /> -->
				<el-button type="primary" @click="handleOption" style="margin-left: 10px;">搜索</el-button>
				<el-button type="primary" @click="handleExport">导出Excel</el-button>
			</div>
		</template>

		<h1 style="text-align: center; margin-bottom: 40px;">{{ head }}</h1>

		<div id="zoom"></div>

		<div id="zoom_pie"></div>

		<el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
			<el-table-column prop="date" label="日期" />
			<el-table-column prop="personnel_pay" label="人员经费(元)" />
			<el-table-column prop="fixed_asset_pay" label="固定资产折旧费(元)" />
			<el-table-column prop="material_pay" label="卫生材料费(元)" />
			<el-table-column prop="medicine_pay" label="药品费(元)" />
			<el-table-column prop="other_pay" label="其他费用(元)" />
			<el-table-column prop="total_money" label="总金额(元)" />
			<!-- <el-table-column prop="sequential" label="环比">
				<template #default="scope">
					<span style="color: #F56C6C;" v-if="scope.row.sequential > 0">{{scope.row.sequential}}</span>
					<span style="color: #67C23A;" v-else>{{scope.row.sequential}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="compare_same" label="同比">
				<template #default="scope">
					<span style="color: #F56C6C;" v-if="scope.row.compare_same > 0">{{scope.row.compare_same}}</span>
					<span style="color: #67C23A;" v-else>{{scope.row.compare_same}}</span>
				</template>
			</el-table-column> -->
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
	let myChartPie = null
	let office_name = sessionGet('userinfo')['name']
	if (office_name == 'root') {
		office_name = '口腔科'
	}
	
	export default {
		// name: 'admin-list',
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

				option_pie: {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					toolbox: {
						show: true,
						orient: 'vertical',
						left: 'right',
						// top: 'center',
						feature: {
							saveAsImage: {
								show: true
							}
						}
					},
					legend: {
						data: [
							'Direct',
							'Marketing',
							'Search Engine',
						]
					},
					series: [{
						name: '支出明细',
						type: 'pie',
						selectedMode: 'single',
						radius: [0, '60%'],
						label: {
							// position: 'inner',
							// fontSize: 14
							show: true,
							formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
							backgroundColor: '#F6F8FC',
							borderColor: '#8C8D8E',
							borderWidth: 1,
							borderRadius: 4,
							rich: {
								a: {
									color: '#6E7079',
									lineHeight: 22,
									align: 'center'
								},
								hr: {
									borderColor: '#8C8D8E',
									width: '100%',
									borderWidth: 1,
									height: 0
								},
								b: {
									color: '#4C5058',
									fontSize: 14,
									fontWeight: 'bold',
									lineHeight: 33
								},
								per: {
									color: '#fff',
									backgroundColor: '#4C5058',
									padding: [3, 4],
									borderRadius: 4
								}
							}

						},
						labelLine: {
							// show: false
							length: 30
						},
						data: [{
								value: 1548,
								name: 'Search Engine'
							},
							{
								value: 775,
								name: 'Direct'
							},
							{
								value: 679,
								name: 'Marketing',
								selected: true
							}
						]
					}]
				}
			})
			onMounted(() => {
				getOffice()
				getBillingIncome()

				// 基于准备好的dom，初始化echarts实例
				myChart = echarts.init(document.getElementById('zoom'))
				myChartPie = echarts.init(document.getElementById('zoom_pie'))

				// 使用刚指定的配置项和数据显示图表。
				// myChart.setOption(state.option)
			})

			onUnmounted(() => {
				myChart.dispose()
				myChartPie.dispose()
			})

			const getBillingIncome = () => {
				state.loading = true
				axios.get('/api/back/pays', {
					params: {
						office_name: state.office_name,
						// charge_subclass: state.charge_subclass,
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

					// 饼图
					myChartPie.dispose()
					myChartPie = echarts.init(document.getElementById('zoom_pie'))
					state.option_pie.legend.data = res.data.pie_chart.legend_data
					state.option_pie.series[0].data = res.data.pie_chart.series_data
					myChartPie.setOption(state.option_pie)
				})
			}

			const getOffice = () => {
				axios.get('/api/back/offices', {
					params: {
						type : 1
					}
				}).then(res => {
					state.office_list = res.data
					// state.office_name = res.data[0].value
				})
			}

			const handleOption = () => {
				getBillingIncome()
			}

			const handleExport = () => {
				axios.get('/api/back/pays/export', {
					params: {
						office_name: state.office_name,
						charge_subclass: state.charge_subclass,
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
					link.setAttribute('download', state.office_name + '-支出明细-' + start_date + '-' + end_date +
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

	#zoom_pie {
		min-height: 600px;
		margin-bottom: 20px;
	}
</style>
