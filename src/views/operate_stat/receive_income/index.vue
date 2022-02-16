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
				<el-input style="width: 200px; margin-top: 20px; margin-right: 10px; margin-left: 10px;"
					placeholder="请输入收费项目" v-model="charge_subclass" clearable />
				<el-button type="primary" @click="handleOption">搜索</el-button>
				<el-button type="primary" @click="handleExport">导出Excel</el-button>
			</div>
		</template>

		<div id="zoom"></div>

		<el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
			<!-- <el-table-column prop="year" label="年" /> -->
			<!-- <el-table-column prop="month" label="月" /> -->
			<el-table-column prop="date" label="日期" />
			<el-table-column prop="receive_dep" label="接单科室" />
			<el-table-column prop="patient_dep" label="病人科室" />
			<el-table-column prop="charge_subclass" label="收费项目" />
			<el-table-column prop="num" label="数量" />
			<el-table-column prop="money" label="金额" />
		</el-table>
	</el-card>
</template>

<script>
	import qs from 'qs';
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
	import * as echarts from 'echarts';

	let myChart = null
	export default {
		name: 'admin-list',
		setup() {
			const value1 = ref(true)
			const multipleTable = ref(null)
			const router = useRouter()
			const state = reactive({
				date: [new Date().getFullYear() + '-' + new Date().getMonth(), new Date().getFullYear() + '-' + (new Date().getMonth()+1)],
				office_name: '口腔科',
				office_list: [],
				charge_subclass: '',
				loading: false,
				tableData: [], // 数据列表
				multipleSelection: [], // 选中项

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
						top: 'center',
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar', 'stack']
							},
							restore: {
								show: true
							},
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
						boundaryGap: true,
						data: []
					}],
					yAxis: [{
						type: 'value'
					}],
					series: []
				}
			})
			onMounted(() => {
				getOffice()
				getBillingIncome()

				// 基于准备好的dom，初始化echarts实例
				myChart = echarts.init(document.getElementById('zoom'))

				// 使用刚指定的配置项和数据显示图表。
				// myChart.setOption(state.option)
			})

			onUnmounted(() => {
				myChart.dispose()
			})

			const getBillingIncome = () => {
				state.loading = true
				axios.get('/api/back/receiveincomes', {
					params: {
						office_name: state.office_name,
						charge_subclass: state.charge_subclass,
						date: state.date,
					}
				}).then(res => {
					myChart.dispose()
					myChart = echarts.init(document.getElementById('zoom'))
					state.tableData = res.data.data
					state.loading = false
					state.option.title.text = res.data.title
					state.option.legend.data = res.data.legend_arr
					state.option.xAxis[0].data = res.data.date_arr
					state.option.series = res.data.series_arr
					myChart.setOption(state.option)
				})
			}

			const getOffice = () => {
				axios.get('/api/back/offices').then(res => {
					state.office_list = res.data
					// state.office_name = res.data[0].value
				})
			}

			const handleOption = () => {
				getBillingIncome()
			}

			const handleExport = () => {
				axios.get('/api/back/receiveincomes/export', {
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
					let start_date = new Date(state.date[0]).getFullYear() + '/' + (new Date(state.date[0]).getMonth()+1)
					let end_date = new Date(state.date[1]).getFullYear() + '/' + (new Date(state.date[1]).getMonth()+1)
					link.setAttribute('download', state.office_name + '-接收金额-' + start_date + '-' + end_date + '.xlsx');
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
		min-height: 400px;
		margin-bottom: 20px;
	}
</style>
