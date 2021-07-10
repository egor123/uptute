<template>
  <div><p>coming soon...</p></div>
</template>

<style scoped>
div {
  position: fixed;
  z-index: 1;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100vh;
  pointer-events: none;
}
div p {
  position: absolute;
  left: 50%;
  top: 40vh;
  transform: rotate(10deg) translate(-50%, -50%);
  font-size: 4rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: bold;
}
</style>