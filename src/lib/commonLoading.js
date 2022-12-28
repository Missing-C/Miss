/*
 * @Author: 蓝山
 * @Date: 2022-12-13 14:49:53
 * @FilePath: \Miss\src\lib\commonLoading.js
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-12-28 10:33:52
 */
import { createApp, reactive } from 'vue'
import Loading from '@/components/Loading/blueLoading.vue'
const msg = reactive({
    show: false,
    title: '拼命加载中...'
})
const $loading = createApp(Loading,{msg}).mount(document.createElement('div'))
const load = {
    show(title) {
        msg.show = true
        msg.title = title
        document.body.appendChild($loading.$el)
    },
    hide() {
        msg.show = false
    }
}
export default {
    install(app) {
        app.config.globalProperties.loadingMiss = load
    }
}