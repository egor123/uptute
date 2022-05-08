<template>
  <video :srcObject.prop="stream" muted playsinline autoplay></video>
</template>

<script>
export default {
  props: {
    stream: MediaStream,
  },
};
</script>

<style lang="scss" scoped>
video {
  border-radius: 15px;
  position: fixed;
  top: 100px; // CHANGE
  right: 20px; // CHANGE
  width: 160px;
  height: 120px;
}
</style>
