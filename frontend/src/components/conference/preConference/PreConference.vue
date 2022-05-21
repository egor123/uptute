<template>
  <div id="buttons">
    <CreateButton @create="$parent.init({ type: 'createRoom' })" />
    <JoinButton
      @join="(id) => $parent.init({ type: 'joinRoom', payload: id })"
    />
  </div>
</template>

<script>
import CreateButton from "@/components/conference/preConference/Create.vue";
import JoinButton from "@/components/conference/preConference/Join.vue";

export default {
  components: {
    CreateButton,
    JoinButton,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/styles.scss";

#buttons {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
