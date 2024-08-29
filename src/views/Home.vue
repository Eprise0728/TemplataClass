<script></script>

<template>
  <div class="view">
    <div class="playerview">
      <router-link to="./PlayerFirstList">填寫問卷 </router-link>
      <router-link to="./PlayerFirstList"
        ><i class="fa-solid fa-file-pen"></i>
      </router-link>
    </div>
    <div class="quview">
      <router-link to="./FirstList">問卷管理 </router-link>
      <router-link to="./FirstList"
        ><i class="fa-solid fa-list-check"></i>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view {
  width: 100%;
  height: 100dvh;
  background-color: #9a9590;
  display: flex;
  justify-content: center;
  align-items: center;
}
.playerview {
  width: 30%;
  height: 30%;
  text-align: center;
  font-size: 2dvw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
  }
}
.quview {
  width: 30%;
  height: 30%;
  margin-left: 5%;
  text-align: center;
  font-size: 2dvw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
  }
}
.fa-solid {
  font-size: 4dvw;
}
</style>
