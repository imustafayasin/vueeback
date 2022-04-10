<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="less">
#app.anime {
  animation: ani 250ms linear 1;
}
@keyframes ani {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
