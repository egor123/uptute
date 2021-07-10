<template>
  <div id="subheader">
    <img @click="goToAboutTutor()" src="@/assets/icons/user.svg" />
    <h3 id="title">{{ name }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#subheader {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    @include box-size(40px);
    border-radius: 50%;
    border: 2px solid var(--v-primary-base);
    opacity: 0.2;
    margin-right: 1rem;
  }
}

#title {
  font-weight: 500;
  font-size: 1.2rem;
}
</style>
