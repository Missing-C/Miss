<!--
 * @Author: 蓝山
 * @Date: 2022-11-22 11:08:41
 * @FilePath: \Miss\src\App.vue
 * @LastEditors: 蓝山
 * @LastEditTime: 2022-12-01 11:18:55
-->
<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { AtomSpinner, BreedingRhombusSpinner } from 'epic-spinners';
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <atom-spinner :animation-duration="1000" :size="60" :color="'hsla(160, 100%, 37%, 1)'" />
  <breeding-rhombus-spinner :animation-duration="1000" :size="60" color="hsla(160, 100%, 37%, 1)" />
  <header>
    <img alt="Vue logo" class="logo" src="./assets/user.jpg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Blue Mountain" />

      <nav>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
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
