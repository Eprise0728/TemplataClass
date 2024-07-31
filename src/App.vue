<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
      <nav class="header">
        <RouterLink to="/" class="routeitem">Home</RouterLink>
        <RouterLink to="./FirstList" class="routeitem">後台列表</RouterLink>
        <RouterLink to="./Question" class="routeitem">後台問卷</RouterLink>
      </nav>
      <div class="content">
        <RouterView />
      </div>
</template>

<style scoped lang="scss">
.header{
  width: 100%;
  height: 10dvh;
  display: flex;
  flex-wrap: wrap;
}
.routeitem{
  width: 10%;
  height: 60%;
  margin-left: 10%;
  font-size: 24px;
  color :black;
  text-decoration-line: none;
}

</style>
