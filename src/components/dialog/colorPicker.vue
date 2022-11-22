<!--
 * @Author: 蓝山
 * @Date: 2022-11-22 17:15:02
 * @FilePath: \trunk\src\components\dialog\colorPicker.vue
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-11-22 18:08:07
-->
<script>
import { showLoading, hideLoading } from "../../lib/loading.js";
export default {
  mixins: [showLoading, hideLoading],
  data() {
    return {
      uploadFileBig: null,
      // 弹窗参数
      dialogVisible: false,
      // 大图参数
      uploadFileBig: null,
      textBig: "",
      colorBig: "",
      pixelBig: null,
      ctxBig: null,
    };
  },
  methods: {
    openDialog(data) {
      this.dialogVisible = true;
      this.uploadFileBig = data;
      this.$nextTick(() => {
        this.canvasInitBig();
      });
    },
    canvasInitBig() {
      const that = this;
      var img = new Image();
      img.src = this.uploadFileBig;
      var localImg = document.getElementById("dialogImg");
      var imgCanvas = document.getElementById("dialogImgCanvas");
      console.log(localImg);
      imgCanvas.width = localImg.width;
      imgCanvas.height = localImg.height;
      this.ctxBig = imgCanvas.getContext("2d");
      img.onload = () => {
        that.ctxBig.drawImage(img, 0, 0, localImg.width, localImg.height);
        that.pixelBig = that.ctxBig.getImageData(1, 1, 1, 1);
        let rgba = that.getRgba(188, 8);
        this.colorBig = rgba;
        this.textBig = rgba;
        hideLoading();
      };
      imgCanvas.addEventListener("click", that.pick);
    },
    // 获取位置像素信息
    getRgba(x, y) {
      var pixel = this.ctxBig.getImageData(x, y, 1, 1);
      var data = pixel.data;
      // 获取rgba值
      var rgba =
        "rgba(" +
        data[0] +
        "," +
        data[1] +
        "," +
        data[2] +
        "," +
        data[3] / 255 +
        ")";
      return rgba;
    },
    // 获取鼠标点击位置
    pick(event) {
      // 获取鼠标坐标
      var x = event.layerX;
      var y = event.layerY;
      console.log("x", x, y);
      // 获取图片像素信息
      let rgba = this.getRgba(x, y);
      // 设置小正方形的背景颜色
      this.colorBig = rgba;

      // 把拼接的字符串设置为元素的文本内容
      this.textBig = rgba;
    },
    // rgb转HEX
    rgb2hex(rgb) {
      var reg = /(\d{1,3}),(\d{1,3}),(\d{1,3})/;
      var arr = reg.exec(rgb);

      function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      var _hex = "#" + hex(arr[1]) + hex(arr[2]) + hex(arr[3]);
      return _hex.toUpperCase();
    },
  },
};
</script>
<template>
  <el-dialog class="color-dialog" v-model="dialogVisible" title="取色器">
    <content class="bigImg-content">
      <div class="bigImg-left">
        <img id="dialogImg" v-if="uploadFileBig" :src="uploadFileBig" alt=""/>
        <canvas id="dialogImgCanvas"></canvas>
      </div>
      <div class="colorInfo-right">
        <span class="color" :style="'background:' + colorBig"></span>
        <span class="text">{{ textBig }}</span>
      </div>
    </content>
  </el-dialog>
</template>
<style lang="stylus" scoped>
#dialogImg {
  opacity: 0;
  width: 100%;
  margin-bottom: 24px;
  margin-left: 24px;
}

#dialogImgCanvas {
  position: absolute;
  top: 0;
  left: 24px;
  z-index: 1
}
.bigImg-content{
  display: flex;
  justify-content: left;
}
.bigImg-left{
  width: 70%
}
.colorInfo-right{
  width: calc(30% - 24px)
  padding 24px
}


.colorInfo-right {
  display: flex;
  justify-content: space-evenly;
  background: rgba(0, 0, 0, 0);

  .color {
    display: block;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .text {
    padding-left: 10px;
    line-height: 40px;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>