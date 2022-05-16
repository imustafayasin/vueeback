<template lang="pug">
.container
 <router-view />
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
