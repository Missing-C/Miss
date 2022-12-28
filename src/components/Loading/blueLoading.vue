<!--
 * @Author: 蓝山
 * @Date: 2022-12-13 14:11:28
 * @FilePath: \Miss\src\components\loading\loading.vue
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-12-27 15:04:33
-->
<script>
// import { SelfBuildingSquareSpinner } from 'epic-spinners';
import { CirclesToRhombusesSpinner } from 'epic-spinners';
export default {
  components:{CirclesToRhombusesSpinner},
  props: {
    msg: Object
  }
}
</script>

<template>
  <content class="loading-body" v-show="msg.show">
    <!-- <self-building-square-spinner :animation-duration="6000" :size="60" color="#ff1d5e" /> -->
    <circles-to-rhombuses-spinner :animation-duration="1200" :circles-num="3" :circle-size="15" color="#ff1d5e" />
    <span>{{msg.title}}</span>
  </content>
</template>

<style lang="stylus" scoped>
.loading-body{
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, .8);
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  :deep(.circles-to-rhombuses-spinner div){
    border-color: var(--color-text) !important
  }
  span{
    display: block;
    color: var(--color-text);
  }
}
</style>
