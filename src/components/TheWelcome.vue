<!--
 * @Author: 蓝山
 * @Date: 2022-11-14 14:09:50
 * @FilePath: \trunk\src\components\TheWelcome.vue
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-11-22 18:09:31
-->
<script>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
import colorPicker from "./dialog/colorPicker.vue";
import { CashOutline as CashIcon } from "@vicons/ionicons5";
import {showLoading,hideLoading} from '../lib/loading.js'
export default {
  components: {
    CashIcon,
    WelcomeItem,
    DocumentationIcon,
    ToolingIcon,
    EcosystemIcon,
    CommunityIcon,
    SupportIcon,
    colorPicker
  },
  mixins: [showLoading,hideLoading],
  data() {
    return {
      // 小图参数
      uploadFileSmall: null,
      pixelSmall: null,
      ctxSmall: null,
      textSmall: "",
      colorSmall: "",
    };
  },
  methods: {
    // 上传图片小
    handleChangeSmall(file) {
      showLoading('加载中')
      const that = this;
      /* file转url --start */
      var reader = new FileReader();
      reader.readAsDataURL(file.file.file);
      reader.onload = function (ev) {
        // url赋值
        that.uploadFileSmall = ev.currentTarget.result;
        /* file转url --start */
        that.$nextTick(() => {
            that.canvasInit();
        })
      };
    },
    // 上传图片大
    handleChangeBig(file) {
      const that = this;
      /* file转url --start */
      var reader = new FileReader();
      reader.readAsDataURL(file.file.file);
      reader.onload = function (ev) {
        // url赋值
        that.uploadFileBig = ev.currentTarget.result;
        that.$refs.colorDialog.openDialog(that.uploadFileBig)
      };
    },
    // 初始化canvas画布
    canvasInit() {
      const that = this;
      var img = new Image();
      img.src = this.uploadFileSmall
      var localImg = document.getElementById("localImg");
      var imgCanvas = document.getElementById("imgCanvas");
      imgCanvas.width = localImg.width;
      imgCanvas.height = localImg.height;
      this.ctxSmall = imgCanvas.getContext("2d");
      img.onload = () => {
        that.ctxSmall.drawImage(img, 0, 0, localImg.width, localImg.height);
        that.pixelSmall = that.ctxSmall.getImageData(1, 1, 1, 1);
        let rgba = that.getRgba(188, 8);
        this.colorSmall = rgba
        this.textSmall = rgba
        hideLoading()
      }
      imgCanvas.addEventListener("click", that.pick);
    },
    // 获取位置像素信息
    getRgba(x, y) {
      var pixel = this.ctxSmall.getImageData(x, y, 1, 1);
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
      this.colorSmall = rgba;

      // 把拼接的字符串设置为元素的文本内容
      this.textSmall = rgba;
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
    setup(editor) {
      console.log(editor);
    },
  },
  mounted() {}
};
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading @click="showColorPanel">取色器</template>
    <template #title>
      上传图片后通过Canvas画布来实现，将图片上传后转为Canvas画布，通过鼠标定位信息获取坐标颜色。
    </template>
    <content class="color-picker">
      <div class="left-upload">
        <n-upload @change="handleChangeSmall">
          <n-button ghost color="#8a2be2">
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
            上传(小)
          </n-button>
        </n-upload>
        <n-upload @change="handleChangeBig">
          <n-button color="#8a2be2">
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
            上传(大)
          </n-button>
        </n-upload>
      </div>
      <div class="right-show">
        <img id="localImg" v-if="uploadFileSmall" :src="uploadFileSmall" alt="" />
        <canvas id="imgCanvas"></canvas>
        <div class="infoBar">
          <span class="color" :style="'background:' + colorSmall"></span>
          <span class="text">{{ textSmall }}</span>
        </div>
      </div>
    </content>
    <color-picker ref="colorDialog"></color-picker>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>剪切板</template>
    <template #title>
      通过document.addEventListener 'paste' 实现监听复制剪切事件。
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>评论区</template>
    <template #title>自定义组件参考微信的回复评论dom结构</template>
    <div class="action-bar">
      <n-button class="release" type="primary">发布</n-button>
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>轮播图</template>
    <template #title>通过添加创建的方式生成轮播图</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>全文检索功能</template>
    <template #title>实现对input,textarea以及文本的全文检索功能</template>
  </WelcomeItem>
</template>
<style lang="stylus" scoped>
:deep(.n-upload-file-list) {
  display: none;
}

.n-layout {
  border: 1px dashed rgb(239, 239, 245);
  box-shadow: 0 0 8px 0 rgba(232 237 250 60%), 0 2px 4px 0 rgba(232 237 250 50%);
}

.n-layout-sider, .n-layout-content {
  padding: 24px;
  justify-content: center;
  border: 0px;
}

.n-layout-sider {
  border-right: 1px dashed rgb(239, 239, 245);
}

:deep(.n-layout-sider-scroll-container) {
  display: flex;
}

.infoBar {
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

.action-bar {
  text-align: right;
  margin-top: 12px;
  width: 100%;

  .release {
    margin-left: 12px;
  }
}

.color-picker {
  display: flex;
  justify-content: left;
  border-radius: 4px;
  box-shadow: var(--box-shadow);

  .n-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    &:last-child{
      margin-bottom: 0px;
    }
  }

  .left-upload {
    padding: 24px;
    width: 30%;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    border-right: 1px dashed var(--vt-c-divider-light-2);
  }

  .right-show {
    padding: 24px;
    width: 70%;
  }
}

#localImg {
  opacity: 0;
  width: 100%;
  margin-bottom: 24px;
}

#imgCanvas {
  position: absolute;
  top: 24px;
  left: 24px;
}
</style>