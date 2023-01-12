<!--
 * @Author: 蓝山
 * @Date: 2022-11-22 11:08:41
 * @FilePath: \Miss\src\App.vue
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-12-30 10:05:22
-->
<script>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
export default {
  components:{HelloWorld},
  data(){
    return {
      darkAndLight: false
    }
  },
  watch: {
    darkAndLight(newDarkAndLight, oldDarkAndLight){
      if(newDarkAndLight == true){
        document.documentElement.setAttribute('data-theme', 'dark')
      }
      if(oldDarkAndLight == true){
        document.documentElement.setAttribute('data-theme', 'light')
      }
    }
  },
  created(){
  },
  mounted(){
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/user.jpg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Blue Mountain" />
      <nav>
        <RouterLink to="/home">Tools</RouterLink>
        <RouterLink to="/about">Manual</RouterLink>
        <el-switch v-model="darkAndLight"/>
        <el-popover
          placement="bottom"
          title="Title"
          :width="200"
          trigger="click"
        >
          <template #reference>
            <el-button class="m-2">主题色</el-button>
          </template>
          123123
        </el-popover>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="stylus" scoped>
header {
  line-height: 1.5;
}

:deep(.wrapper){
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

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
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

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
