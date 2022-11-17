<!--
 * @Author: 蓝山
 * @Date: 2022-11-14 14:09:50
 * @FilePath: \blue-mountain\src\App.vue
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-11-15 16:56:32
-->
<script>
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
export default {
  data () {
    return{
      timer: null
    }
  },
  components:{HelloWorld,TheWelcome},
  methods: {
    imgRotate() {
    },
    imgStop() {
    }
  },
};
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/user.jpg"
      width="125"
      height="125"
      @mouseenter="imgRotate()"
      @mouseleave="imgStop()"
    />

    <div class="wrapper">
      <HelloWorld msg="Blue mountain - Tools!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style lang="stylus" scoped>
header {
  line-height: 1.5;
}

/deep/.wrapper{
  width:calc(100% - 125px)
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  border-radius: 50%;
  object-fit: cover;
}

.logo:hover {
  transform: rotate(666turn);
  transition: all 59s cubic-bezier(.34,0,.84,1) 1s;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc((var(--section-gap) / 2));
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
