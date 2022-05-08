<template>
  <video :srcObject.prop="stream" playsinline autoplay></video>
</template>

<script>
export default {
  props: {
    stream: MediaStream,
  },
};
</script>

<style lang="scss" scped>
video {
  border-radius: 15px;
  width: 480px;
  height: 360px;
}
</style>
