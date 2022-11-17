<!--
 * @Author: 蓝山
 * @Date: 2022-11-14 14:09:50
 * @FilePath: \blue-mountain\src\components\TheWelcome.vue
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-11-15 17:25:12
-->
<script>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
import { defineComponent } from "vue";
import { CashOutline as CashIcon } from "@vicons/ionicons5";
export default defineComponent({
  components: {
    CashIcon,
    WelcomeItem,
    DocumentationIcon,
    ToolingIcon,
    EcosystemIcon,
    CommunityIcon,
    SupportIcon,
  },
  data() {
    return {
      uploadFile: null,
      pixel: null,
      ctx: null,
      text: '',
      color: ''
    };
  },
  methods: {
    handleChange(file) {
      const that = this;
      /* file转url --start */
      var reader = new FileReader();
      reader.readAsDataURL(file.file.file);
      reader.onload = function (ev) {
        // url赋值
        that.uploadFile = ev.currentTarget.result;
        /* file转url --start */
        setTimeout(()=>{
          that.canvasInit()
        },3000)
      };
    },
    canvasInit(){
      const that = this;
      var img = new Image();
      img.src = this.uploadFile;
      var localImg = document.getElementById("localImg");
      var imgCanvas = document.getElementById("imgCanvas");
      imgCanvas.width = localImg.width;
      imgCanvas.height = localImg.height;
      this.ctx = imgCanvas.getContext("2d");
      img.onload = () => {
        that.ctx.drawImage(img, 0, 0, localImg.width, localImg.height);
        that.pixel = that.ctx.getImageData(1, 1, 1, 1);
        let rgba = that.getRgba(188, 8);
        this.color = rgba;
        this.text = rgba;
        imgCanvas.addEventListener("click", that.pick);
      };
    },
    getRgba(x, y) {
      var pixel = this.ctx.getImageData(x, y, 1, 1);
      var data = pixel.data;
      // 获取rgba值
      var rgba = "rgba(" + data[0] + "," + data[1] + "," + data[2] + "," + data[3] / 255 + ")";
      return rgba;
    },
    pick(event) {
      // 获取鼠标坐标
      var x = event.layerX;
      var y = event.layerY;
      console.log("x", x, y);
      // 获取图片像素信息
      let rgba = this.getRgba(x, y);
      // 设置小正方形的背景颜色
      this.color = rgba;

      // 把拼接的字符串设置为元素的文本内容
      this.text = rgba;
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
});
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading @click="showColorPanel">取色器</template>
    <template #title>
      上传图片后通过Canvas画布来实现，将图片上传后转为Canvas画布，通过鼠标定位信息获取坐标颜色。
    </template>
    <n-layout has-sider>
      <n-layout-sider content-style="padding: 24px;">
        <n-upload @change="handleChange">
          <n-button ghost color="#8a2be2">
            <template #icon><n-icon><cash-icon /></n-icon></template>
            上传
          </n-button>
        </n-upload>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        <img id="localImg" v-if="uploadFile" :src="uploadFile" alt="" />
        <canvas id="imgCanvas"></canvas>
        <div class="infoBar">
          <span class="color" :style="'background:'+color"></span>
          <span class="text">{{text}}</span>
        </div>
      </n-layout-content>
    </n-layout>
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
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener"
      >Vue Router</a
    >,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener"
      >Vue Test Utils</a
    >, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener"
      >Vue Dev Tools</a
    >. If you need more resources, we suggest paying
    <a
      href="https://github.com/vuejs/awesome-vue"
      target="_blank"
      rel="noopener"
      >Awesome Vue</a
    >
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a
    >, our official Discord server, or
    <a
      href="https://stackoverflow.com/questions/tagged/vue.js"
      target="_blank"
      rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener"
      >our mailing list</a
    >
    and follow the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
      >@vuejs</a
    >
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its
    sustainability. You can help us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener"
      >becoming a sponsor</a
    >.
  </WelcomeItem>
</template>
<style lang="stylus" scoped>

#localImg {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 380px;
}

#imgCanvas{
  margin-bottom: 24px;
}

/deep/.n-upload-file-list {
  display: none;
}

.n-upload {
  display: flex;
  align-items: center;
  justify-content: center;
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

/deep/.n-layout-sider-scroll-container {
  display: flex;
}

.infoBar{
  display: flex;
  justify-content: space-evenly;
  background: rgba(0,0,0,0)
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