<template>
  <div class="imgContainer">
    <div class="innerImgContainer">
      <v-icon class="magnifiying-glass">mdi-magnify</v-icon>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.imgContainer {
  display: flex;
  align-items: center;
  width: 1rem;
  height: 1rem;

  animation: triangularMovement 2s ease-in-out infinite alternate both,
    opacityChange 2.3s ease-in-out infinite alternate both;
  margin: 1.5rem auto;
}
.innerImgContainer {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  animation: scaleChange 2s ease-in-out 1s infinite alternate both;
  img {
    width: 100%;
    height: 100%;
  }
}

@keyframes triangularMovement {
  from {
    transform: translateX(1rem);
  }
  to {
    transform: translateX(-1rem);
  }
}

@keyframes scaleChange {
  from {
    transform: scale(1);
    -moz-transform: scale(1);
  }
  to {
    transform: scale(0.75);
    -moz-transform: scale(0.75);
  }
}

@keyframes opacityChange {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0;
  }
}
</style>
