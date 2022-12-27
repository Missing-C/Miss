<!--
 * @Author: 蓝山
 * @Date: 2022-11-22 17:15:02
 * @FilePath: \Miss\src\components\dialog\colorPicker.vue
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-12-27 11:30:38
-->
<script>
export default {
  data() {
    return {
      uploadFileBig: null,
      // 弹窗参数
      dialogVisible: false,
      // 大图参数
      uploadFileBig: null,
      textBigRgba: '',
      colorBigRgba: '',
      textBigRgb: '',
      colorBigRgb: '',
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
      var localImg = document.getElementById('dialogImg');
      var imgCanvas = document.getElementById('dialogImgCanvas');
      console.log(localImg);
      imgCanvas.width = localImg.width;
      imgCanvas.height = localImg.height;
      this.ctxBig = imgCanvas.getContext('2d');
      img.onload = () => {
        that.ctxBig.drawImage(img, 0, 0, localImg.width, localImg.height);
        that.pixelBig = that.ctxBig.getImageData(1, 1, 1, 1);
        let rgba = that.getRgba(188, 8);
        this.colorBigRgba = rgba;
        this.textBigRgba = rgba;
        let rgb = that.getRgb(188, 8);
        this.colorBigRgb = rgb;
        this.textBigRgb = rgb;
        that.loadingMiss.hide()
      };
      imgCanvas.addEventListener('click', that.pick);
    },
    // 获取位置像素信息
    getRgba(x, y) {
      var pixel = this.ctxBig.getImageData(x, y, 1, 1);
      var data = pixel.data;
      // 获取rgba值
      var rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] / 255 + ')';
      return rgba;
    },
    // 获取位置像素信息
    getRgb(x, y) {
      var pixel = this.ctxBig.getImageData(x, y, 1, 1);
      var data = pixel.data;
      // 获取rgb值
      var rgb = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
      return rgb;
    },
    // 获取鼠标点击位置
    pick(event) {
      // 获取鼠标坐标
      var x = event.layerX;
      var y = event.layerY;
      console.log('x', x, y);
      // 获取图片像素信息
      let rgba = this.getRgba(x, y);
      let rgb = this.getRgb(x, y);
      // 设置小正方形的背景颜色
      this.colorBigRgba = rgba;
      this.colorBigRgb = rgb;
      // 把拼接的字符串设置为元素的文本内容
      this.textBigRgba = rgba;
      this.textBigRgb = rgb;
    },
    // rgb转HEX
    rgb2hex(rgb) {
      var reg = /(\d{1,3}),(\d{1,3}),(\d{1,3})/;
      var arr = reg.exec(rgb);

      function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
      }
      var _hex = '#' + hex(arr[1]) + hex(arr[2]) + hex(arr[3]);
      return _hex.toUpperCase();
    },
  },
};
</script>
<template>
  <el-dialog class="color-dialog" v-model="dialogVisible" title="取色器">
    <content class="bigImg-content">
      <div class="bigImg-left">
        <img id="dialogImg" v-if="uploadFileBig" :src="uploadFileBig" alt="" />
        <canvas id="dialogImgCanvas"></canvas>
      </div>
      <div class="colorInfo-right">
        <el-row :gutter="20">
          <el-col :span="8" style="text-align: center">
            <span class="text">色块</span>
            <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="16">
            <span class="text">色值</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" style="text-align: center">
            <span class="color" :style="'background:' + colorBigRgba"></span>
            <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="16">
            <span class="text">{{ textBigRgba }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" style="text-align: center">
            <span class="color" :style="'background:' + colorBigRgb"></span>
            <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="16">
            <span class="text">{{ textBigRgb }}</span>
          </el-col>
        </el-row>
      </div>
    </content>
  </el-dialog>
</template>
<style lang="stylus" scoped>
#dialogImg {
  opacity: 0;
  width: 100%;
}

#dialogImgCanvas {
  position: absolute;
  z-index: 1;
}

.bigImg-content {
  display: flex;
  justify-content: left;
  height: 100%;
}

.bigImg-left {
  width: 70%;
  height: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
}

.colorInfo-right {
  width: 30%;
  height: 100%;
  padding: 24px;
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  align-content: flex-start;
  background: rgba(0, 0, 0, 0);

  .color {
    display: block;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin: 0 auto;
  }

  .text {
    line-height: 40px;
    font-size: 20px;
    font-weight: 600;
  }

  .el-row {
    width: 100%;
    margin: 0 !important;
  }

  .el-col {
    text-align: center;
    padding-bottom: 24px !important;
    border-right: 1px dashed var(--vt-c-divider-light-2);
    &:last-child{
      border-right: 0px dashed var(--vt-c-divider-light-2);
    }
  }
}
</style>
