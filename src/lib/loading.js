/*
 * @Author: 蓝山
 * @Date: 2022-11-22 16:04:13
 * @FilePath: \trunk\src\lib\loading.js
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-11-22 16:45:38
 */
import { ElLoading } from 'element-plus'
let loading    
function startLoading(text) {    //使用Element loading-start 方法
    loading = ElLoading.service({
        lock: true,
        text: text,
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}
let loadingIndex = 0
export function showLoading(text){
    if(loadingIndex == 0){startLoading(text)}
    loadingIndex++
}
export function hideLoading(){
    if(loadingIndex <= 0) return
    loadingIndex--
    if(loadingIndex == 0) endLoading()
}