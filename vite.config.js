import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
	ElementPlusResolver
} from 'unplugin-vue-components/resolvers'

const baseUrl = {
	development: './',
	test: './',
	production: './',
}

// https://vitejs.dev/config/
export default ({
	mode
}) => defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './'),
			'@': path.resolve(__dirname, 'src')
		}
	},
	base: baseUrl[mode],
	server: {
		proxy: {
			'/apis': {
				target: 'http://luxy.three_hospital_data_analyse_api.com/',
				// target: 'http://127.0.0.1:8001/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/apis/, '')
			}
		},
		// cors: true,
		host: '0.0.0.0'
	}
})
